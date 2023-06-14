const expressAsyncHandler = require('express-async-handler')
const sgMail = require('@sendgrid/mail')
const EmailMsg = require('../../model/emailMessaging/EmailMessaging')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendEmailMsgCtrl = expressAsyncHandler(async (req, res) => {
  // console.log(req.user) // see what we have under user
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

    // save to database
    res.json('Mail Sent')
    await EmailMsg.create({
      sentBy: req?.user?._id,
    })
  } catch (error) {
    res.json(error)
  }
})

module.exports = { sendEmailMsgCtrl }
