const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const crypto = require('crypto')


const maxAge = 3 * 24 * 60 * 60
    //create jwt
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
        res.status(200).json({ success: "true", token: token })

    } catch (error) {
        console.log(error)
        const errors = handleError(error)
        res.status(400).json({ errors })
    }

}

module.exports.signIn_post = async(req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email })

        if (user) {
            console.log(user)
            console.log(req.headers.authorization.authToken)

            const compare = await bcrypt.compare(req.body.password, user.password)

            if (compare == true) {
                const token = await createToken(user._id)
                console.log(token)
                    // console.log(jwt.verify(token, 'secret'));
                    // res.cookie('jwt', token, { maxAge: maxAge * 1000 })
                    // res.status(200).json(user)
                res.status(200).json({ success: "true", token: token })
            } else {
                console.log(compare)
                res.status(400).json('wrong password')
            }

        } else {
            res.json('invalid email')
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports.forgotPassword = async(req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            res.json('invalid user')
        }
        if (user) {
            const resetToken = crypto.randomBytes(25).toString('hex')
            user.resetPasswordToken = crypto.createHash('sha256')
                .update(resetToken)
                .digest('hex')
            user.resetPasswordExpiry = Date.now() + 10 * 60 * 1000
            await user.save()

            const resetUrl = `http://localhost:3000/passwordReset/${resetToken}`
            const resetResponse = `
            <div>visit this link to reset your password</div>
            <a href='${resetUrl}'>${resetUrl}</a>
            `
        }

    } catch (error) {
        console.log(error);
    }

}

module.exports.resetPassword = async(req, res) => {
    res.json('reset password')
}