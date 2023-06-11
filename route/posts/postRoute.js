const express = require('express')
const {
  createPostCtrl,
  fetchAllPostsCtrl,
  fetchPostCtrl,
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
postRoute.get('/:id', fetchPostCtrl)

module.exports = postRoute
