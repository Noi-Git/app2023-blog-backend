const User = require('../../model/user/User')
const expressAsyncHandler = require('express-async-handler')

// === Register user ===
const userRegisterCtrl = async (req, res) => {
  //check if user exist
  const userExists = await User.findOne({ email: req?.body?.email })

  if (userExists) {
    throw new Error('User already exists')
  }

  console.log(req.body)
  try {
    const user = await User.create({
      firstName: req?.body?.firstName,
      lastName: req?.body?.lastName,
      email: req?.body?.email,
      password: req?.body?.password,
    })
    res.json(user)
  } catch (error) {
    res.json(error)
  }
}

// === Login user ===
const userLoginCtrl = expressAsyncHandler(async (req, res) => {
  //check if user exist
  const user = await User.findOne({ email: req?.body?.email })

  if (!user) {
    throw new Error(`Please provide valid email or password`)
  }
  res.json('You are in') //if user exist
})

module.exports = { userRegisterCtrl, userLoginCtrl }
