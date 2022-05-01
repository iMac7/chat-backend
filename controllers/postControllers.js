const Post = require('../models/Post')
const User = require('../models/User')


module.exports.publicPost_get = async(req, res) => {

    const userID = JSON.parse(req.headers.authorization).userID

    try {
        const posts = await Post.find().sort({ time: -1 })
            .skip((req.query.page - 1) * req.query.limit)
            .limit(req.query.limit)
            .lean()

        const newposts = posts.map(post => {
            if (post.likedBy.includes(userID)) {
                post.liked = true
            } else {
                post.liked = false
            }
        })

        if (posts === []) {
            return
        } else {
            res.json(posts)
        }
    } catch (error) {
        console.log(error)
    }
}

//get
module.exports.publicPost_replies = async(req, res) => {
    const post = await Post.findOne({ _id: req.params.id })
    res.json(post)
}


module.exports.publicPost_post = async(req, res) => {

    try {
        const { content, sender } = req.body
        console.log(content, sender);
        const user = await User.findOne({ _id: sender })
        console.log(user.username);

        const date = new Date().toLocaleString()
        const time = Date.now()
        if (req.file) {
            const post = await Post.create({
                sender: user.username,
                content: content,
                imageUrl: req.file && req.file.path,
                sendTime: date,
                time: time
            })
            return res.json('post successful')

        } else {
            const post = await Post.create({
                sender: user.username,
                content: content,
                sendTime: date,
                time: time
            })
            return res.json('post successful')
        }

    } catch (error) {
        console.log(error)
        return res.json(error)
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