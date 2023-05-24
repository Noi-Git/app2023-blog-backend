const express = require('express')
const {
  userRegisterCtrl,
  userLoginCtrl,
  fetchUsersCtrl,
  deleteUsersCtrl,
  fetchUserDetailsCtrl,
  userProfileCtrl,
} = require('../../controllers/users/usersCtrl')
const authMiddleware = require('../../middlewares/auth/authMiddleware')

const usersRoutes = express.Router()

usersRoutes.post('/register', userRegisterCtrl)
usersRoutes.post('/login', userLoginCtrl)
usersRoutes.get('/', authMiddleware, fetchUsersCtrl)
usersRoutes.get('/profile/:id', userProfileCtrl)
usersRoutes.get('/:id', fetchUserDetailsCtrl)
usersRoutes.delete('/:id', deleteUsersCtrl)

module.exports = usersRoutes
