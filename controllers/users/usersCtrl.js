const generateToken = require('../../config/token/generateToken')
const User = require('../../model/user/User')
const expressAsyncHandler = require('express-async-handler')
const validateMongodbId = require('../../utils/validateMongodbID')

// === Register user ===
const userRegisterCtrl = expressAsyncHandler(async (req, res) => {
  // Extract email and password from request body
  const { email, password } = req.body

  if (!password) {
    throw new Error('Password is required')
  }

  //check if user exist
  const userExists = await User.findOne({ email: req?.body?.email })
  if (userExists) {
    throw new Error('User already exists')
  }

  //Create new user
  const user = new User(req.body)

  //Hash passwords
  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(password, salt)

  //Save user to the database
  await user.save()

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

  //check if password is matched
  if (userFound && (await userFound.isPasswordMatched(password))) {
    // if (userFound && userFound.password === password) {
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
  // console.log(req.headers)
  try {
    //.find() <- return an array
    const users = await User.find({})
    res.json(users)
  } catch (error) {
    res.json(error)
  }
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
}
