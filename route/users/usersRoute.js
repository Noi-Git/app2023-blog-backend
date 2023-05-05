const express = require('express')
const {
  userRegisterCtrl,
  userLoginCtrl,
} = require('../../controllers/users/usersCtrl')

const usersRoutes = express.Router()

usersRoutes.post('/register', userRegisterCtrl)
usersRoutes.post('/login', userLoginCtrl)

module.exports = usersRoutes
