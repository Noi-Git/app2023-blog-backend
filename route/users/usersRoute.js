const express = require('express')
const {
  userRegisterCtrl,
  userLoginCtrl,
  fetchUsersCtrl,
  deleteUsersCtrl,
} = require('../../controllers/users/usersCtrl')

const usersRoutes = express.Router()

usersRoutes.post('/register', userRegisterCtrl)
usersRoutes.post('/login', userLoginCtrl)
usersRoutes.get('/', fetchUsersCtrl)
usersRoutes.delete('/:id', deleteUsersCtrl)

module.exports = usersRoutes
