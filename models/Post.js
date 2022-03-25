const mongoose = require('mongoose')

const replySchema = new mongoose.Schema({

})

const postSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true,
    },

    sendTime: Date,

    content: {
        type: String,
        required: true,
        maxlength: 100,
    },

    imageUrl: {
        type: String,
    },

    replies: replySchema,

    likes: {
        type: Number,
        default: 0,
    },

    likedBy: {
        type: [String],
        default: [],
        ref: 'User'
    },

    profilePic: {
        type: String,
        default: null
    }

}, { collection: 'postcontents' })


module.exports = mongoose.model('PostContent', postSchema)