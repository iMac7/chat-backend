const Post = require('../models/Post')
const User = require('../models/User')
const fs = require('fs')

//reply urls

module.exports.profile_get = async(req, res) => {
    const user = await User.findOne({ _id: req.params.id })
    res.json({
        email: user.email,
        username: user.username ? user.username : null,
        verified: user.verified,
        bio: user.bio ? user.bio : '',
    })
}

//post
module.exports.profile_update = async(req, res) => {
    const { username, bio } = req.body
    const user = await User.findOne({ _id: req.params.id })
    user.username = username
    user.bio = bio
    await user.save().then(res.json('profile updated!'))
}

// update dp
module.exports.profilepic_post = async(req, res) => {
    const userdata = JSON.parse(req.headers.authorization)
    try {
        if (req.file) {
            const user = await User.find({ id: userdata.userID })
            user.profilepic = req.file.path
            console.log(req.file.path)
            await user.save()
        } else { return }

    } catch (error) {
        console.log(error)
        res.json(error)
    }
    res.json('profile pic updated :)')
}