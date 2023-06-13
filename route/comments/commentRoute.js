const express = require('express')
const {
  createCommentCtrl,
  fetchAllCommentsCtrl,
  fetchCommentCtrl,
  updateCommentCtrl,
} = require('../../controllers/comments/commentCtrl')
const authMiddleware = require('../../middlewares/auth/authMiddleware')

const commentRoute = express.Router()
commentRoute.post('/', authMiddleware, createCommentCtrl)
commentRoute.get('/', authMiddleware, fetchAllCommentsCtrl)
commentRoute.put('/:id', authMiddleware, updateCommentCtrl)

module.exports = commentRoute
