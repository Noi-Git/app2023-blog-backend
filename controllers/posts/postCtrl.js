const expressAsyncHandler = require('express-async-handler')
const Post = require('../../model/post/Post')

const createPostCtrl = expressAsyncHandler(async (req, res) => {
  res.json('Post controller')
})

module.exports = { createPostCtrl }
