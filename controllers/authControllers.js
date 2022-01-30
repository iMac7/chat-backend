const User = require('../User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({ id }, 'secret', { expiresIn: maxAge })
}


module.exports.signUp_post = async(req, res) => {
    const { email, password } = req.body

    console.log(req.body)


    const handleError = (error) => {
        let errors = { email: '', password: '' }

        if (error.code === 11000) {
            errors.email = "email in use"
            return errors
        }

        if (error.message.includes('validation failed')) {
            Object.values(error.errors).forEach(({ properties }) => {
                errors[properties.path] = properties.message
            })
        }
        return errors
    }

    try {
        const user = await User.create({ email, password })
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(201).json({ userid: user._id })
    } catch (error) {
        console.log(error)
        const errors = handleError(error)
        res.status(400).json({ errors })
    }

}

module.exports.signIn_post = async(req, res) => {

    const user = await User.findOne({ email: req.body.email })
    if (user) {
        const compare = await bcrypt.compare(req.body.password, user.password)

        if (compare) {
            const token = createToken(user._id)
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
            res.status(200).json({ user: user._id })
        } else {
            res.status(400).json('wrong password')
        }

    } else {
        res.json('invalid email')
    }
}