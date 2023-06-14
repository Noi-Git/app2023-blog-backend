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

const fetchAllCateroriesCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const categories = await Category.find({})
      .populate('user')
      .sort('-createdAt') //use populate to fetch actual user
    res.json(categories)
  } catch (error) {
    res.json(error)
  }
})

const fetchCategoryCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    const category = await Category.findById(id)
      .populate('user')
      .sort('-createdAt') //use populate to fetch actual user
    res.json(category)
  } catch (error) {
    res.json(error)
  }
})

module.exports = {
  createCategoryCtrl,
  fetchAllCateroriesCtrl,
  fetchCategoryCtrl,
}
