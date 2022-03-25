const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    senderID: {
        type: String,
        required: true,
    },
    sentAt: Date
})

module.exports = mongoose.model('Message', messageSchema)