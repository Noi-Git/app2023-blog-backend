const express = require('express')
const { userRegisterCtrl } = require('../../controllers/users/usersCtrl')

const usersRoutes = express.Router()

usersRoutes.post('/register', userRegisterCtrl)

module.exports = usersRoutes