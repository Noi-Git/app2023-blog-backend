const express = require('express')
const authMiddleware = require('../../middlewares/auth/authMiddleware')
const {
  createCategoryCtrl,
  fetchAllCateroriesCtrl,
  fetchCategoryCtrl,
} = require('../../controllers/categorys/categoryCtrl')

const categoryRoute = express.Router()

categoryRoute.post('/', authMiddleware, createCategoryCtrl)
categoryRoute.get('/', authMiddleware, fetchAllCateroriesCtrl)
categoryRoute.get('/:id', authMiddleware, fetchCategoryCtrl)

module.exports = categoryRoute
