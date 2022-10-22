const User = require('../models/User')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const sendEmail = require('../utils/sendEmail')
require('dotenv').config()


module.exports.signUp_post = async(req, res) => {
    console.log(req.body)
    const { email, password, username } = req.body

    try {
        const user = await User.create({ email, password, username })
        res.status(201).json('login')

    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}

module.exports.signIn_post = async(req, res) => {
    const body = req.body
    if (!body.email || !body.password) {
        res.status(400).json('email and password required')
            // console.log('no email or password');
    }

    try {
        const user = await User.findOne({ email: req.body.email })
        
        if (user) {
            const compare = await user.comparePassword(body.password)

            if (compare) {
                const token = jwt.sign(user.id, process.env.secret)
                res.status(200).json({ userID: user.id, token: token, verified: user.verified, dp: user.profilepic })

            } else {
                // console.log(`compare:${compare}`)
                res.status(400).json('wrong password')
            }
        } else {
            res.status(404).json('user not found')
        }
    } catch (error) {
        // res.status(500).json({ error: error.message })
        console.log(error)
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

        try {
            await sendEmail({
                to: user.email,
                subject: 'password reset request',
                text: `
                <div>visit this link to reset your password</div>
                <a href='${resetUrl}'>${resetUrl}</a>
                `
            })
            res.status(200).json('email sent!')
        } catch (error) {
            user.resetPasswordToken = undefined
            user.resetPasswordExpiry = undefined
            await user.save()
                // return next(res.status(500).json('email not sent :( . Please try again later '))
            return res.status(500).json('email not sent :( . Please try again later ')
        }

    } catch (error) {
        console.log(error);
        res.status(400).json('invalid user')
    }

}

module.exports.resetPassword = async(req, res) => {
    const resetPasswordToken = crypto.createHash('sha256')
        .update(req.params.resetToken)
        .digest('hex')

    try {
        const user = await user.findOne({
            resetPasswordToken,
            resetPasswordExpiry: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(400).json('invalid reset token')
        }
        user.password = req.body.password
        user.resetPasswordToken = undefined
        user.resetPasswordExpiry = undefined

        await user.save()

        res.status(201).json('password reset successful! check your email for reset link')
    } catch (error) {
        res.status(400).json('password reset unsuccessful :(')

    }
}