const multer = require('multer')

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/webp': 'webp'
}

const fileUpload = multer({
    limits: 1000000,
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/images')
        },
        filename: (req, file, cb) => {
            const extension = MIME_TYPE_MAP[file.mimetype]
            cb(null, Math.random() + '.' + extension)
        },
        fileFilter: (req, file, cb) => {
            const isValid = !!MIME_TYPE_MAP[file.mimetype]
            let error = isValid ? null : new Error('invalid file type')
            cb(error, isValid)
        }
    })
})

module.exports = fileUpload