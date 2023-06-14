const expressAsyncHandler = require('express-async-handler')
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendEmailMsgCtrl = expressAsyncHandler(async (req, res) => {
  // res.json('email')
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
