const Post = require('../models/Post')
const User = require('../models/User')
const fs = require('fs')

//post urls
module.exports.publicPost_get = async(req, res) => {

    const userID = JSON.parse(req.headers.authorization).userID

    try {
        const posts = await Post.find().sort({ time: -1 })
            .select('-time')
            .skip((req.query.page - 1) * req.query.limit)
            .limit(req.query.limit)
            .lean()

        const newposts = posts.map(post => {
            if (post.likedBy.includes(userID)) post.liked = true
            else { post.liked = false }


            post.likes = post.likedBy.length
            post.replies = post.replies.length
        })

        if (posts === []) {
            return
        } else {
            res.json(posts)
        }
    } catch (error) {
        console.log(error)
        return res.json(error)
    }
}

module.exports.publicPost_post = async(req, res) => {

    try {
        const { content, sender } = req.body
        const user = await User.findOne({ _id: sender })

        const date = new Date().toLocaleString()
        const time = Date.now()
        if (req.file) {
            const post = await Post.create({
                sender: user.username,
                senderID: sender,
                content: content,
                imageUrl: req.file && req.file.path,
                profileUrl: user.profilepic,
                sendTime: date,
                time: time
            })
            return res.json('post successful')

        } else {
            const post = await Post.create({
                sender: user.username,
                senderID: sender,
                content: content,
                sendTime: date,
                profileUrl: user.profilepic,
                time: time
            })
            return res.json('post successful')
        }

    } catch (error) {
        console.log(error)
        return res.json(error)
    }

}

module.exports.publicPost_delete = async(req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id })
        if (post.imageUrl) { fs.unlink(post.imageUrl, err => console.log(err)) }
        await Post.deleteOne({ _id: req.params.id })
        res.status(200).json('deleted !')
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

//post like & unlike
module.exports.likePost_post = async(req, res) => {

    try {
        const post = await Post.findOne({ _id: req.body.postID })
        const sender = await User.findOne({ _id: req.body.senderID })
        const senderID = sender._id

        if (post && post.likedBy.includes(senderID)) {
            post.likes -= 1
            post.likedBy.splice(post.likedBy.indexOf(senderID), 1)
            await post.save()
            res.json('unliked :(')

        } else {
            post.likes += 1
            post.likedBy.push(req.body.senderID)
            await post.save()
            res.json('liked :) !')
        }

    } catch (error) {
        console.log(error)
        return res.json(error)
    }
}

//reply urls
module.exports.publicPost_replies_get = async(req, res) => {
    const uid = JSON.parse(req.headers.authorization)
    const post = await Post.findOne({ _id: req.params.id })
    post.replies = post.replies.reverse()
    res.json(post)
}

module.exports.publicPost_replies_post = async(req, res) => {
    console.log(req.body)
    const reply = req.body.post
    const userID = req.body.sender.userID
    console.log(userID)
    const post = await Post.findOne({ _id: req.params.id })
    const user = await User.findOne({ _id: userID })
        //sender content sendtime time
    const date = new Date().toLocaleString()
    const time = Date.now()

    post.replies.push({
        sender: userID,
        senderName: user.username,
        content: reply,
        sendTime: date,
        time: time
    })
    await post.save()
    res.json('reply sent !')
}

module.exports.publicPost_replies_delete = async(req, res) => {
    try {
        const userID = JSON.parse(req.headers.authorization).userID

        // console.log(req.params.postID)
        const post = await Post.findOne({ _id: req.params.postID })
        if (post.senderID !== userID) {
            return res.status(404).json('Unauthorized')
        }
        console.log('replies', post.replies.length)
        const newreplies = post.replies.filter(element => {
            element.id !== req.params.replyID
        })
        post.replies = newreplies
        await post.save()
        res.status(200).json('deleted !')
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}