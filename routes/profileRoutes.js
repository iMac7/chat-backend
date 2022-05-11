const { Router } = require('express')
const profileControllers = require('../controllers/profileControllers')
const fileUpload = require('../middleware/fileUpload')

const router = Router()

router.get('/profile/:id', profileControllers.profile_get)

router.post('/profile/:id/update', profileControllers.profile_update)

//profile pic
router.post('/profilepic/:id/update', fileUpload.single('image'), profileControllers.profilepic_post)


module.exports = router