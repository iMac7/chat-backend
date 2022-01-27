const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./User')
const bcrypt = require('bcrypt')
const cors = require("cors")

// mongoose.connect('mongodb://localhost/users3')

// async function find() {
//     try {
//         const user = await User.find()
//         console.log(user)
//     } catch (e) {
//         console.log(e.message);
//     }
// }

// find()

const app = express()
const port = 3001

app.use(bodyParser.json())

// app.use(express.urlencoded({ extended: false }))
// app.use(cors)

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE'))
    next()
})


app.get('/', (req, res) =>
    res.send("get successful"))

app.post('/', (req, res) =>
    console.log(req.body)
)

app.post('/signUp', async(req, res) => {
    console.log(req.body);
})

app.listen(port, () => console.log(`listening on port ${port}!`))