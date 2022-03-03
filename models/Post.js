const mongoose = require('mongoose')

const replySchema = new mongoose.Schema({

})

const postSchema = new mongoose.Schema({

    senderID: mongoose.SchemaTypes.ObjectId,
    atSenderName: String,
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

    likesBy: {
        type: mongoose.SchemaTypes.ObjectId,
        default: [],
    },

}, { collection: 'postcontents' })


module.exports = mongoose.model('PostContent', postSchema)