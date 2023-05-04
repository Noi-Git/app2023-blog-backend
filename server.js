const express = require('express')
const dotenv = require('dotenv')

dotenv.config()
const dbConnect = require('./config/db/dbConnect')

const app = express()

dbConnect()
// console.log(process.env)

//create endpoints
//(req, res) => {} <-- this is controller where action happen

//Register
app.post('/api/users/register', (req, res) => {
  //business logic
  res.json({ user: 'User Register' })
})

//Login
app.get('/api/users/login', (req, res) => {
  //business logic
  res.json({ user: 'User Login' })
})

const PORT = process.env.PORT || 5001
app.listen(PORT, console.log(`Server is runing on port ${PORT}`))
