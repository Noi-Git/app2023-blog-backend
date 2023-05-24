const generateToken = require('../../config/token/generateToken')
const User = require('../../model/user/User')
const expressAsyncHandler = require('express-async-handler')
const validateMongodbId = require('../../utils/validateMongodbID')

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
  const { email, password } = req.body
  const userFound = await User.findOne({ email })
  console.log('email:- ', email)
  console.log('password:- ', password)
  console.log('userFound:- ', userFound)

  if (!userFound) {
    throw new Error('Invalid credentials')
  }

  //check if password is matched
  // if (userFound && (await userFound.isPasswordMatched(password))) {
  if (userFound && userFound.isPasswordMatched(password)) {
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

//=== Fetch all users ===
const fetchUsersCtrl = expressAsyncHandler(async (req, res) => {
  console.log(req.headers)
  try {
    //.find() <- return an array
    const users = await User.find({})
    res.json(users)
  } catch (error) {
    res.json(error)
  }
})

//=== Fetch user profile ===
// only allow login user to view their profile
const userProfileCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params

  validateMongodbId(id)
  try {
    const myProfile = await User.findById(id)
    res.json(myProfile)
  } catch (error) {
    res.json(error)
  }
})

//=== Update user profile ===
const updateUserProfileCtrl = expressAsyncHandler(async (req, res) => {
  res.json('profile')
  // const {id} = req.params
  try {
  } catch (error) {}
})

//=== Fetch a single user ===
const fetchUserDetailsCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params

  validateMongodbId(id)

  try {
    const user = await User.findById(id)
    res.json(user)
  } catch (error) {
    res.json(error)
  }
})

//=== Delete users ===
const deleteUsersCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params

  //check if user id is valid
  validateMongodbId(id)

  try {
    const deletedUser = await User.findByIdAndDelete(id)
    res.json(deletedUser)
  } catch (error) {}
})

module.exports = {
  userRegisterCtrl,
  userLoginCtrl,
  fetchUsersCtrl,
  fetchUserDetailsCtrl,
  deleteUsersCtrl,
  userProfileCtrl,
  updateUserProfileCtrl,
}
