const Post = require('../models/Post')

module.exports.publicPost_get = async(req, res) => {
    try {
        const post = await Post.find()
        res.json(post)

    } catch (error) {
        res.json(error)
    }
}

module.exports.publicPost_post = async(req, res) => {
    const postedBy = JSON.parse(req.body.postedBy).userID

    try {
        const post = await Post.create({ content: req.body.post, senderID: postedBy })
        res.status(201).json('post successful')

    } catch (error) {
        res.json(error)
    }
}