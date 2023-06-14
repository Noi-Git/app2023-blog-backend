const expressAsyncHandler = require('express-async-handler')
const sgMail = require('@sendgrid.sgMail')

const sendEmailMsgCtrl = expressAsyncHandler(async (req, res) => {
  const { to, subject, message } = req.body
  try {
    //building message
    const msg = {
      to,
      subject,
      message,
    }
  } catch (error) {
    res.json(error)
  }
})

module.exports = { sendEmailMsgCtrl }
