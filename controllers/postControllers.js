const Post = require('../models/Post')
const User = require('../models/User')


module.exports.publicPost_get = async(req, res) => {
    const userID = JSON.parse(req.headers.authorization).userID

    try {
        const posts = await Post.find().lean()

        const newposts = posts.map(post => {
            if (post.likedBy.includes(userID)) {
                post.liked = true
            } else {
                post.liked = false
            }
        })
        res.json(posts)

    } catch (error) {
        console.log(error)
    }
}

module.exports.publicPost_post = async(req, res) => {

    try {
        const { content, sender } = req.body
        console.log(content, sender);
        const user = await User.findOne({ _id: sender })
        console.log(user.username);

        if (req.file) {
            const post = await Post.create({
                    sender: user.username,
                    content: content,
                    imageUrl: req.file.path,
                })
                .then(res.status(201).json('post successful'))

        } else {
            const post = await Post.create({
                    sender: user.username,
                    content: content,
                })
                .then(res.status(201).json('post successful'))

        }



    } catch (error) {
        res.json(error)
    }
}

module.exports.likePost_post = async(req, res) => {
    console.log(req.body);


    try {
        const post = await Post.findOne({ _id: req.body.postID })
        const sender = await User.findOne({ _id: req.body.senderID })
        const senderID = sender._id

        if (post && post.likedBy.includes(senderID)) {
            post.likes -= 1
            post.likedBy.splice(post.likedBy.indexOf(senderID), 1)
            await post.save()
            res.json('unliked :( ')

        } else {
            post.likes += 1
            post.likedBy.push(req.body.senderID)
            await post.save()
            res.json('liked :) !')
        }

    } catch (error) {
        console.log(error)
        res.json(error)
    }
}