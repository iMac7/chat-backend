const Post = require('../models/Post')
const User = require('../models/User')
const fs = require('fs')

//reply urls
//get user profile
module.exports.profile_get = async(req, res) => {
    const user = await User.findOne({ _id: req.params.id })
    res.json({
        email: user.email,
        username: user.username ? user.username : null,
        verified: user.verified,
        bio: user.bio ? user.bio : '',
        profileURL: user.profilepic
    })
}

//(method:post) update username and bio
module.exports.profile_update = async(req, res) => {
    const { username, bio } = req.body
    const user = await User.findOne({ _id: req.params.id })

    if (username.trim() !== "") user.username = username
    if (bio.trim() !== "") user.bio = bio

    await user.save().then(res.json('profile updated!'))
}

// update dp
module.exports.profilepic_post = async(req, res) => {
    const userdata = JSON.parse(req.headers.authorization)
    try {
        if (req.file) {
            const user = await User.findOne({ _id: userdata.userID })
                // if (typeof user.profilepic === 'string') {
                //     fs.unlink(user.profilepic)
                // }
            user.profilepic = req.file.path
            await user.save()
            res.json('profile pic updated :)')
        }
    } catch (error) {
        res.json('something went wrong, try again later ;(')
    }
}