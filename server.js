const express = require('express')
const dotenv = require('dotenv')

dotenv.config()
const dbConnect = require('./config/db/dbConnect')
const { userLoginCtrl } = require('./controllers/users/usersCtrl')
const usersRoutes = require('./route/users/usersRoute')

const app = express()

dbConnect()
// console.log(process.env)

//Middleware
app.use(express.json())

//Register
app.use('/api/users', usersRoutes)

//Login
app.post('/api/users/login', userLoginCtrl)

//fetch all users
app.get('/api/users', (req, res) => {
  res.json({ user: 'Fetch all user' })
})

const PORT = process.env.PORT || 5001
app.listen(PORT, console.log(`Server is runing on port ${PORT}`))

// http://localhost:5001/api/users/register
