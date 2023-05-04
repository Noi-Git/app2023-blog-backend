const express = require('express')
const dotenv = require('dotenv')

dotenv.config()
const dbConnect = require('./config/db/dbConnect')

const app = express()

dbConnect()
// console.log(process.env)

//Register
app.post('/api/users/register')

//Login
app.post('/api/users/login', (req, res) => {
  res.json({ user: 'User Login' })
})

//fetch all users
app.get('/api/users', (req, res) => {
  res.json({ user: 'Fetch all user' })
})

const PORT = process.env.PORT || 5001
app.listen(PORT, console.log(`Server is runing on port ${PORT}`))

// http://localhost:5001/api/users/register
