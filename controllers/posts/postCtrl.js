const expressAsyncHandler = require('express-async-handler')
const Filter = require('bad-words')
const Post = require('../../model/post/Post')
const validateMongodbId = require('../../utils/validateMongodbID')

const createPostCtrl = expressAsyncHandler(async (req, res) => {
  // res.json('Post controller')
  validateMongodbId(req.body.user)
  // check for bad words
  const filter = new Filter()
  const isProfane = filter.isProfane(req.body.title, req, body.description)
  console.log(isProfane)
  try {
    const post = await Post.create(req.body)
    res.json(post)
  } catch (error) {
    res.json(error)
  }
})

module.exports = { createPostCtrl }
