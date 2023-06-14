const express = require('express')
const {
  createCategoryCtrl,
} = require('../../controllers/categorys/categoryCtrl')

const categoryRoute = express.Router()

categoryRoute.post('/', createCategoryCtrl)

module.exports = categoryRoute
