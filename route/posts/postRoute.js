const express = require('express')
const { createPostCtrl } = require('../../controllers/posts/postCtrl')
const authMiddleware = require('../../middlewares/auth/authMiddleware')
const { photoUpload } = require('../../middlewares/uploads/photoUpload')
const postRoute = express.Router()

postRoute.post('/', authMiddleware, photoUpload.single('image'), createPostCtrl)

module.exports = postRoute
