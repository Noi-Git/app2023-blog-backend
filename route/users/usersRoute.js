const express = require('express')
const { userRegisterCtrl } = require('../../controllers/users/usersCtrl')

const usersRoutes = express.Router()

userRoutes.post('/api/users/register', userRegisterCtrl)

module.exports = usersRoutes
