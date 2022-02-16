const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({

    // senderName: String,
    // atSenderName: String,
    // sendTime: Date,
    content: {
        type: String,
        required: true,
        maxlength: 64,
    },


}, { collection: 'postcontents' })


module.exports = mongoose.model('PostContent', postSchema)