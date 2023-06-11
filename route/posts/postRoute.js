const express = require('express')
const {
  createPostCtrl,
  fetchAllPostsCtrl,
  fetchPostCtrl,
  updatePostCtrl,
  deletePostCtrl,
  toggleAddLikeToPostCtrl,
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
postRoute.put('/likes', authMiddleware, toggleAddLikeToPostCtrl)
postRoute.get('/', fetchAllPostsCtrl)
postRoute.get('/:id', fetchPostCtrl)
postRoute.put('/:id', authMiddleware, updatePostCtrl)
postRoute.delete('/:id', authMiddleware, deletePostCtrl)

module.exports = postRoute
