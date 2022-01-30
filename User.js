const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'email required'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'enter a password'],
        minlength: [4, 'password too short']
    }
}, { collection: 'users' })

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

module.exports = mongoose.model('User', userSchema)