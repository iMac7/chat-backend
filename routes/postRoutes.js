const { Router } = require('express')
const postControllers = require('../controllers/postControllers')
const fileUpload = require('../middleware/fileUpload')

const router = Router()

//post urls
router.get('/publicPosts', postControllers.publicPost_get)

router.post('/publicPost', fileUpload.single('image'), postControllers.publicPost_post)

router.delete('/publicPost/:id/delete', postControllers.publicPost_delete)


//reply urls
router.get('/publicPosts/:id/replies', postControllers.publicPost_replies_get)

router.post('/publicPosts/:id/replies', postControllers.publicPost_replies_post)

router.delete('/publicPost/:postID/replies/:replyID', postControllers.publicPost_replies_delete)

//like & unlike post
router.post('/likePost', postControllers.likePost_post)


module.exports = router