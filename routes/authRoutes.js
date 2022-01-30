const { Router } = require('express')
const authRoutes = require('../controllers/authControllers')

const router = Router()

// router.get('/signUp', authRoutes.signUp_get)

router.post('/signUp', authRoutes.signUp_post)

// router.get('/signIn', authRoutes.signIn_get)

router.post('/signIn', authRoutes.signIn_post)


module.exports = router