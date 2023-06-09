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
  generateEmailVerificationTokenCtrl,
  accountVerificationCtrl,
  forgetPasswordTokenCtrl,
  passwordResetCtrl,
  profilePhotoUploadCtrl,
} = require('../../controllers/users/usersCtrl')
const authMiddleware = require('../../middlewares/auth/authMiddleware')
const {
  profilePhotoUpload,
} = require('../../middlewares/uploads/profilePhotoUpload')
const usersRoutes = express.Router()

usersRoutes.post('/register', userRegisterCtrl)
usersRoutes.post('/login', userLoginCtrl)
usersRoutes.put(
  '/profile-photo-upload',
  authMiddleware,
  profilePhotoUpload.single('image'),
  profilePhotoUploadCtrl
)
usersRoutes.get('/', authMiddleware, fetchUsersCtrl)
usersRoutes.post('/forget-password-token', forgetPasswordTokenCtrl)
usersRoutes.put('/reset-password', passwordResetCtrl)
usersRoutes.put('/password', authMiddleware, updateUserPasswordCtrl)
usersRoutes.put('/follow', authMiddleware, followingUsersCtrl)
usersRoutes.post(
  '/generate-verify-email-token',
  authMiddleware,
  generateEmailVerificationTokenCtrl
)
usersRoutes.put('/verify-account', authMiddleware, accountVerificationCtrl)
usersRoutes.put('/unfollow', authMiddleware, unFollowUsersCtrl)
usersRoutes.put('/block-user/:id', authMiddleware, blockUserCtrl)
usersRoutes.put('/unblock-user/:id', authMiddleware, unBlockUserCtrl)
usersRoutes.get('/profile/:id', authMiddleware, userProfileCtrl)
usersRoutes.put('/:id', authMiddleware, updateUserProfileCtrl)
usersRoutes.get('/:id', fetchUserDetailsCtrl)
usersRoutes.delete('/:id', deleteUsersCtrl)

module.exports = usersRoutes
