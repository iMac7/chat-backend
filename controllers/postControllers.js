const Post = require('../models/Post')

module.exports.publicPost_get = async(req, res) => {
    try {
        const post = await Post.find()
        console.log(post)
        console.log('public post')
        res.json(post)

    } catch (error) {
        res.json(error)
    }
}

module.exports.publicPost_post = async(req, res) => {

    try {
        const post = await Post.create({ content: req.body.post })
        console.log(req.body)
        res.status(201).json('post successful')

    } catch (error) {
        res.json(error)
    }
}