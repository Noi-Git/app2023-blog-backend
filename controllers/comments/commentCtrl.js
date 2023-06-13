const expressAsyncHandler = require('express-async-handler')
const Comment = require('../../model/comment/Comment')

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

module.exports = { createCommentCtrl }
