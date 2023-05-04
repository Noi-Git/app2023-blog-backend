const express = require('express')
const { userRegisterCtrl } = require('../../controllers/users/usersCtrl')

const userRoutes = express.Router()

userRoutes.post('/api/users/register', userRegisterCtrl)

module.exports = userRoutes
