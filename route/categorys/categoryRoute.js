const express = require('express')
const authMiddleware = require('../../middlewares/auth/authMiddleware')
const {
  createCategoryCtrl,
  fetchAllCateroriesCtrl,
  fetchCategoryCtrl,
  updateCategoryCtrl,
  deleteCategoryCtrl,
} = require('../../controllers/categorys/categoryCtrl')

const categoryRoute = express.Router()

categoryRoute.post('/', authMiddleware, createCategoryCtrl)
categoryRoute.get('/', authMiddleware, fetchAllCateroriesCtrl)
categoryRoute.get('/:id', authMiddleware, fetchCategoryCtrl)
categoryRoute.put('/:id', authMiddleware, updateCategoryCtrl)
categoryRoute.delete('/:id', authMiddleware, deleteCategoryCtrl)

module.exports = categoryRoute
