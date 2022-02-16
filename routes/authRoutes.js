const { Router } = require('express')
const authControllers = require('../controllers/authControllers')

const router = Router()

// router.get('/signUp', authRoutes.signUp_get)

router.post('/signUp', authControllers.signUp_post)

// router.get('/signIn', authRoutes.signIn_get)

router.post('/signIn', authControllers.signIn_post)

router.get('/forgotPassword', authControllers.forgotPassword)

router.get('/resetPassword/:resetToken', authControllers.resetPassword)

module.exports = router