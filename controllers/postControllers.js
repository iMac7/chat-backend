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
    const parsedBody = JSON.parse(req.body.sender)
    const postedBy = parsedBody.userID

    try {
        const post = await Post.create({ content: req.body.post, senderID: postedBy, imageUrl: req.file.path })
        res.status(201).json('post successful')

    } catch (error) {
        res.json(error)
    }


}