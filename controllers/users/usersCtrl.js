const User = require('../../model/user/User')
const expressAsyncHandler = require('express-async-handler')

// === Register user ===
const userRegisterCtrl = expressAsyncHandler(async (req, res) => {
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
})

// === Login user ===
const userLoginCtrl = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body //destructure email and password from reqest body
  const userFound = await User.findOne({ email: req?.body?.email })

  //check if password is matched
  if (userFound && (await userFound.isPasswordMatched)) {
    res.json(userFound)
  } else {
    res.status(401)
    throw new Error('Invalid Login credential')
  }
})

module.exports = { userRegisterCtrl, userLoginCtrl }
