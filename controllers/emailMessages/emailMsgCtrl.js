const expressAsyncHandler = require('express-async-handler')
const sgMail = require('@sendgrid.sgMail')

const sendEmailMsgCtrl = expressAsyncHandler(async (req, res) => {
  const { to, subject, message } = req.body
  try {
    //building message
    const msg = {
      to,
      subject,
      text: message,
      from: 'noi.patsin@gmail.com',
    }

    //send message
    await sgMail.send(msg)
    res.json('Mail Sent')
  } catch (error) {
    res.json(error)
  }
})

module.exports = { sendEmailMsgCtrl }
