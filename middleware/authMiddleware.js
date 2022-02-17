const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    if (req.method === 'OPTIONS') {
        return next()
    }
    const token = JSON.parse(req.headers.authorization).token
    console.log(token);

    if (token) {
        jwt.verify(token, 'secret', (err, decodedToken) => {
            if (err) {
                console.log('invalid token, redirecting to login')
                res.json('/login')
            } else {
                console.log(decodedToken)
                console.log("token ok")
                next()
            }
        })
    } else {
        res.json('/login')
    }
}