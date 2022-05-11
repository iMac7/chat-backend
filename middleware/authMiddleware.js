const jwt = require('jsonwebtoken')
require('dotenv').config()


module.exports = (req, res, next) => {

    if (req.method === 'OPTIONS') {
        return next()
    }

    const token = JSON.parse(req.headers.authorization).token

    if (token) {
        try {
            jwt.verify(token, process.env.secret, (err, decodedToken) => {
                if (err) {
                    res.status(403).json('/login')
                } else {
                    req.userData = { decodedToken }
                    next()
                }
            })
        } catch (error) {
            console.log(error);
        }

    } else {
        res.status(401).json('/login')
    }
}

//TODO pass user down to the next middleware (JSON.parse(req.headers.authorization).user = user)