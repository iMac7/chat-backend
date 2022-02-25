const mongoose = require('mongoose')

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    dpURL: {
        type: String,
    },

}, { collection: 'groups' })


module.exports = mongoose.model('Group', groupSchema)