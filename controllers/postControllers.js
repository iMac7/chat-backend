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
    const { content, sender, image } = req.body

    try {
        if (image) {
            const post = await Post.create({ content: content, senderID: sender, imageUrl: image })
        } else {
            const post = await Post.create({ content: content, senderID: sender })
        }
        console.log(post);
        res.status(201).json('post successful')

    } catch (error) {
        res.json(error)
    }
}