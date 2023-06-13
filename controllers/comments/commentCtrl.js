const expressAsyncHandler = require('express-async-handler')
const Comment = require('../../model/comment/Comment')

//=== Create comment ===
const createCommentCtrl = expressAsyncHandler(async (req, res) => {
  //1. get user
  // console.log(req.user) //we have access to the user because we logins
  const user = req.user

  //2. get post id -- from request object
  const { postId, description } = req.body
  // console.log(postId)
  console.log(description)

  //make request to create comment
  try {
    const comment = await Comment.create({
      post: postId,
      user: user,
      description: description,
    })
    res.json(comment)
  } catch (error) {
    res.json(error)
  }

  res.json('Create comment')
})

//=== Fetch All Comments ===
const fetchAllCommentsCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const comments = await Comment.find({}).sort('-created') //find comments and sort them by ascending order
    res.json(comments)
  } catch (error) {
    res.json(error)
  }
})

//=== Fetch a single Comment ===
const fetchCommentCtrl = expressAsyncHandler(async (req, res) => {
  try {
    res.json('single comment')
  } catch (error) {
    res.json(error)
  }
})

module.exports = { createCommentCtrl, fetchAllCommentsCtrl, fetchCommentCtrl }
