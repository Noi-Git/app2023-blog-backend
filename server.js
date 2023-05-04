const express = require('express')
const dotenv = require('dotenv')

dotenv.config()
const dbConnect = require('./config/db/dbConnect')
const usersRoutes = require('./route/users/usersRoute')

const app = express()

dbConnect()
// console.log(process.env)

//Middleware
app.use(express.json())

//Register
app.use('/api/users', usersRoutes)

//Login
// app.use('/api/users', )

//fetch all users
// app.use('/api/users',)

const PORT = process.env.PORT || 5001
app.listen(PORT, console.log(`Server is runing on port ${PORT}`))

// http://localhost:5001/api/users/register
