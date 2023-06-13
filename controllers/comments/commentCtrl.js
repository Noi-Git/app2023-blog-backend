const expressAsyncHandler = require('express-async-handler')

const createCommentCtrl = expressAsyncHandler(async (req, res) => {
  res.json('Create comment')
})

module.exports = { createCommentCtrl }
