const generateToken = require('../../config/token/generateToken')
const User = require('../../model/user/User')
const expressAsyncHandler = require('express-async-handler')

// === Register user ===
const userRegisterCtrl = expressAsyncHandler(async (req, res) => {
  //check if user exist
  const userExists = await User.findOne({ email: req?.body?.email })

  if (userExists) {
    throw new Error('User already exists')
  }

  // console.log(req.body)
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
  const { email, password } = req?.body //destructure email and password from request body
  const userFound = await User.findOne({ email }) //.findOne() <- return an object

  //check if password is matched
  // if (userFound && (await userFound.isPasswordMatched(password))) {
  if (userFound && userFound.password === password) {
    res.json({
      _id: userFound._id,
      firstName: userFound?.firstName,
      lastName: userFound?.lastName,
      email: userFound?.email,
      profilePhoto: userFound?.profilePhoto,
      isAdmin: userFound?.isAdmin,
      token: generateToken(userFound?._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid Login credential')
  }
})

//=== Fetch al users ===

const fetchUsersCtrl = expressAsyncHandler(async (req, res) => {
  try {
    //.find() <- return an array
    const users = await User.find({})
    res.json(users)
  } catch (error) {
    res.json(error)
  }
})

module.exports = { userRegisterCtrl, userLoginCtrl, fetchUsersCtrl }
