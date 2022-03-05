const Post = require('../models/Post')
const User = require('../models/User')


module.exports.publicPost_get = async(req, res) => {
    const userID = JSON.parse(req.headers.authorization).userID

    try {
        const posts = await Post.find().lean()
        const newposts = posts.map(post => {
            // return {...post, liked: post.likedBy.includes(userID) }

            if (post.likedBy.includes(userID)) {
                post.liked = true
            } else {
                post.liked = false
            }
            return post;
        })
        res.json(newposts)


    } catch (error) {
        console.log(error)
    }

}

module.exports.publicPost_post = async(req, res) => {

    const { content, sender } = req.body

    try {
        const post = await Post.create({ content: content, senderID: sender, imageUrl: req.file.path })
        res.status(201).json('post successful')
        console.log(post);

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

        // console.log(post.likedBy);
        // console.log(post.likedBy[0], sender._id);

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
        // res.status(400).json('not liked :( .try again later')
        console.log(error);
    }
}