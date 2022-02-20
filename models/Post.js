const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({

    senderID: mongoose.SchemaTypes.ObjectId,
    atSenderName: String,
    sendTime: Date,
    content: {
        type: String,
        required: true,
        maxlength: 64,
    },
    imageUrl: {
        type: String,
        required: false,
    }

}, { collection: 'postcontents' })


module.exports = mongoose.model('PostContent', postSchema)