const express = require('express')
const {
  sendEmailMsgCtrl,
} = require('../../controllers/emailMessages/emailMsgCtrl')

const emailMsgRoute = express.Router()

emailMsgRoute.post('/', sendEmailMsgCtrl)

module.exports = emailMsgRoute
