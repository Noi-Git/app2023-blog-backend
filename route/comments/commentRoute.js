const express = require('express')
const {
  createCommentCtrl,
  fetchAllCommentsCtrl,
} = require('../../controllers/comments/commentCtrl')
const authMiddleware = require('../../middlewares/auth/authMiddleware')

const commentRoute = express.Router()
commentRoute.post('/', authMiddleware, createCommentCtrl)
commentRoute.get('/', authMiddleware, fetchAllCommentsCtrl)

module.exports = commentRoute
