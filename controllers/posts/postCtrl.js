const expressAsyncHandler = require('express-async-handler')
const Post = require('../../model/post/Post')

const createPostCtrl = expressAsyncHandler(async (req, res) => {
  // res.json('Post controller')
  try {
    const post = await Post.create(req.body)
    restart.json(post)
  } catch (error) {
    res.json(error)
  }
})

module.exports = { createPostCtrl }
