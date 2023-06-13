const expressAsyncHandler = require('express-async-handler')

const createCommentCtrl = expressAsyncHandler(async (req, res) => {
  //1. get user
  // console.log(req.user) //we have access to the user because we logins
  const user = req.user

  //2. get post id -- from request object
  const { postId } = req.body
  console.log(postId)

  res.json('Create comment')
})

module.exports = { createCommentCtrl }
