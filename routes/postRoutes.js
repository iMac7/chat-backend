const { Router } = require('express')
const postControllers = require('../controllers/postControllers')

const router = Router()

router.get('/publicPosts', postControllers.publicPost_get)

router.post('/publicPost', postControllers.publicPost_post)

module.exports = router