const { Router } = require('express')
const authControllers = require('../controllers/authControllers')

const router = Router()

router.post('/signUp', authControllers.signUp_post)

router.post('/signIn', authControllers.signIn_post)

router.get('/forgotPassword', authControllers.forgotPassword)

router.get('/resetPassword/:resetToken', authControllers.resetPassword)

module.exports = router