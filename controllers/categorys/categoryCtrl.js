const expressAsyncHandler = require('express-async-handler')
const Category = require('../../model/category/Category')

const createCategoryCtrl = expressAsyncHandler(async (req, res) => {
  try {
    //create category to use for dropdown in frontend
    const category = await Category.create({
      user: req.user._id,
      title: req.body.title,
    })
    res.json(category)
  } catch (error) {
    res.json(error)
  }
})

module.exports = { createCategoryCtrl }
