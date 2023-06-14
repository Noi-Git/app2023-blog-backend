const expressAsyncHandler = require('express-async-handler')
const sgMail = require('@sendgrid/mail')
const Filter = require('bad-words')
const EmailMsg = require('../../model/emailMessaging/EmailMessaging')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendEmailMsgCtrl = expressAsyncHandler(async (req, res) => {
  // console.log(req.user) // see what we have under user
  const { to, subject, message } = req.body
  const emailMessage = subject + ' ' + message
  //prevent profanity/bad words
  const filter = new Filter()

  const isProfane = filter.isProfane(emailMessage)
  if (isProfane) throw new Error('Email failed to send, it contains bad word')

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

    await EmailMsg.create({
      sentBy: req?.user?._id,
      from: req?.user?.email,
      to,
      message,
      subject,
    })
    res.json(EmailMsg)
  } catch (error) {
    res.json(error)
  }
})

module.exports = { sendEmailMsgCtrl }
