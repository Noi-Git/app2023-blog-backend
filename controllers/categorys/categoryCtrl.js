const expressAsyncHandler = require('express-async-handler')

const createCategoryCtrl = expressAsyncHandler(async (req, res) => {
  res.json('category')
})

module.exports = { createCategoryCtrl }
