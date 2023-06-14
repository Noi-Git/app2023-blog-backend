const express = require('express')
const authMiddleware = require('../../middlewares/auth/authMiddleware')
const {
  createCategoryCtrl,
  fetchAllCateroriesCtrl,
} = require('../../controllers/categorys/categoryCtrl')

const categoryRoute = express.Router()

categoryRoute.post('/', authMiddleware, createCategoryCtrl)
categoryRoute.get('/', authMiddleware, fetchAllCateroriesCtrl)

module.exports = categoryRoute
