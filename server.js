const express = require('express')
const dotenv = require('dotenv')

dotenv.config()
const dbConnect = require('./config/db/dbConnect')
const usersRoutes = require('./route/users/usersRoute')
const { errorHandler, notFound } = require('./middlewares/error/errorHandler')

const app = express()

dbConnect()
// console.log(process.env)

//Middleware
app.use(express.json())

//Register
app.use('/api/users', usersRoutes)

/* ==== call errorHandler below all your routes === */
app.use(notFound) //need to be before (errorHandler) because of next()
app.use(errorHandler)

const PORT = process.env.PORT || 5001
app.listen(PORT, console.log(`Server is runing on port ${PORT}`))

// http://localhost:5001/api/users/register
