const mongoose = require('mongoose')

const replySchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true,
    },

    senderName: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true,
        maxlength: 100,
    },
    //actual date to display in the frontend
    sendTime: {
        type: String,
        required: true,
    },

    //date used for sorting items in backend
    time: {
        type: Number,
        required: true,
    },

    imageUrl: {
        type: String,
    },

    likes: {
        type: Number,
        default: 0,
    },

    likedBy: {
        type: [String],
        default: [],
        ref: 'User'
    },

})

const postSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true,
    },

    senderID: {
        type: String,
        required: true
    },

    //actual date to display in the frontend
    sendTime: {
        type: String,
        // required: true,
    },

    //date used for sorting items in backend
    time: {
        type: Number,
        // required: true,
    },

    content: {
        type: String,
        required: true,
        maxlength: 100,
    },

    imageUrl: {
        type: String,
    },

    replies: [replySchema],

    likes: {
        type: Number,
        default: 0,
    },

    likedBy: {
        type: [String],
        default: [],
        ref: 'User'
    },

}, { collection: 'postcontents' })


module.exports = mongoose.model('PostContent', postSchema)