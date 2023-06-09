const express = require('express')
const { createPostCtrl } = require('../../controllers/posts/postCtrl')
const postRoute = express.Router()

postRoute.post('/', createPostCtrl)

module.exports = postRoute
