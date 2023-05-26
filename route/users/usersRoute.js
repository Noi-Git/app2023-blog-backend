const express = require('express')
const {
  userRegisterCtrl,
  userLoginCtrl,
  fetchUsersCtrl,
  deleteUsersCtrl,
  fetchUserDetailsCtrl,
  userProfileCtrl,
  updateUserProfileCtrl,
  updateUserPasswordCtrl,
  followingUsersCtrl,
  unFollowUsersCtrl,
  blockUserCtrl,
  unBlockUserCtrl,
  generateEmailVerificationCtrl,
} = require('../../controllers/users/usersCtrl')
const authMiddleware = require('../../middlewares/auth/authMiddleware')

const usersRoutes = express.Router()

usersRoutes.get('/', authMiddleware, fetchUsersCtrl)
usersRoutes.post('/register', userRegisterCtrl)
usersRoutes.post('/login', userLoginCtrl)
usersRoutes.put('/password', authMiddleware, updateUserPasswordCtrl)
usersRoutes.put('/follow', authMiddleware, followingUsersCtrl)
usersRoutes.post('/send-email', authMiddleware, generateEmailVerificationCtrl)
usersRoutes.put('/unfollow', authMiddleware, unFollowUsersCtrl)
usersRoutes.put('/block-user/:id', authMiddleware, blockUserCtrl)
usersRoutes.put('/unblock-user/:id', authMiddleware, unBlockUserCtrl)
usersRoutes.get('/profile/:id', authMiddleware, userProfileCtrl)
usersRoutes.put('/:id', authMiddleware, updateUserProfileCtrl)
usersRoutes.get('/:id', fetchUserDetailsCtrl)
usersRoutes.delete('/:id', deleteUsersCtrl)

module.exports = usersRoutes
