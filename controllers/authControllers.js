const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const crypto = require('crypto')

module.exports.signUp_post = async(req, res) => {
    console.log(req.body)
    const { email, password } = req.body

    try {
        const user = await User.create({ email, password })
        const token = jwt.sign({ userID: user.id, email: user.email },
            'secret', { expiresIn: '24h' }
        )
        res.status(200).json({ userID: user.id, email: user.email, token: token, sentAt: 1000 * 60 * 60 * 24 })

    } catch (error) {
        res.status(400).json({ error })
    }

}

module.exports.signIn_post = async(req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email })

        if (user) {
            console.log(user)

            const compare = await bcrypt.compare(req.body.password, user.password)

            if (compare === true) {
                const token = jwt.sign({ userID: user.id, email: user.email },
                    'secret', { expiresIn: '24h' }
                )
                console.log(token)
                res.status(200).json({ userID: user.id, email: user.email, token: token, sentAt: 1000 * 60 * 60 * 24 })

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