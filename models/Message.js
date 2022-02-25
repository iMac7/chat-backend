const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    content: String,
})

module.exports = mongoose.model('Message', messageSchema)