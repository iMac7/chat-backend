if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const path = require('path')

const User = require('./models/User')
const authRoutes = require('./routes/authRoutes')
const postRoutes = require('./routes/postRoutes')
const auth = require('./middleware/authMiddleware')
const fileUpload = require('express-fileupload')

const connectionString = 'mongodb://localhost/Users'
const app = express()
const port = 3001

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(console.log("connected"))
    .then(app.listen(port, () => console.log(`listening on port ${port}!`)))
    .catch((e) => console.log(e))


app.use('/uploads/images', express.static(path.join('uploads', 'images')))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization', )
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE')
    next()
})
app.use(bodyParser.json())


app.use(authRoutes)
    // app.use(auth)
app.use(postRoutes)

app.get('/', (req, res) => {})

app.get('/protected', (req, res) => {
    res.send('/protected');
})