const { Router } = require('express')
const postControllers = require('../controllers/postControllers')
const fileUpload = require('../middleware/fileUpload')

const router = Router()

router.get('/publicPosts', postControllers.publicPost_get)

router.post('/publicPost', fileUpload.single('image'), postControllers.publicPost_post)

router.post('/likePost', postControllers.likePost_post)

module.exports = router