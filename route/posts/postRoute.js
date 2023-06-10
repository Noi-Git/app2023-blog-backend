const express = require('express')
const {
  createPostCtrl,
  fetchAllPostsCtrl,
} = require('../../controllers/posts/postCtrl')
const authMiddleware = require('../../middlewares/auth/authMiddleware')
const {
  photoUpload,
  postImageResize,
} = require('../../middlewares/uploads/photoUpload')
const postRoute = express.Router()

postRoute.post(
  '/',
  authMiddleware,
  photoUpload.single('image'),
  postImageResize,
  createPostCtrl
)
postRoute.get('/', fetchAllPostsCtrl)

module.exports = postRoute
