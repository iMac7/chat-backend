const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'email required'],
        unique: [true, 'email already in use'],
        lowercase: true,
        validate: [isEmail, 'Enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'enter a password'],
        minlength: [4, 'password too short'],
    },
    joined: {
        type: Date,
        immutable: true,
    },
    likedPosts: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: 'PostContent'
    },
    verified: {
        type: Boolean,
        default: false,
    },
    following: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: 'User'
    },
    resetPasswordToken: String,
    resetPasswordExpiry: Date,

}, { collection: 'users' })

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password)

}

module.exports = mongoose.model('User', userSchema)