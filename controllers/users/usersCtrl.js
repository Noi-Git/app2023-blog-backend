const expressAsyncHandler = require('express-async-handler')
const sgMail = require('@sendgrid/mail')
const crypto = require('crypto')
const generateToken = require('../../config/token/generateToken')
const User = require('../../model/user/User')
const validateMongodbId = require('../../utils/validateMongodbID')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

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

//=== Update user profile ===
const updateUserProfileCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user
  // console.log(_id)

  validateMongodbId(_id)

  const user = await User.findByIdAndUpdate(
    _id,
    {
      firstName: req?.body?.firstName,
      lastName: req?.body?.lastName,
      email: req?.body?.eamil,
      bio: req?.body?.bio,
    },
    {
      new: true,
      runValidators: true,
    }
  )
  res.json(user)
})

//=== Update user password ===
const updateUserPasswordCtrl = expressAsyncHandler(async (req, res) => {
  // only login user can update its password
  const { _id } = req?.user
  const { password } = req?.body

  validateMongodbId(_id)

  // finde user by id .. then update password
  const user = await User.findById(_id)

  if (password) {
    user.password = password
    const updatedUser = await user.save()
    res.json(updatedUser)
  }
  res.json(user)
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

//=== Following ===
const followingUsersCtrl = expressAsyncHandler(async (req, res) => {
  const { followId } = req.body
  const loginUserId = req.user._id

  //find the target user -- check if the user with login id exist
  const targetUser = await User.findById(followId)
  // console.log('this is target user: ', targetUser)

  const alreadyFollowing = targetUser?.followers?.find(
    (user) => user?.toString() === loginUserId.toString()
  )
  // console.log('already following: ', alreadyFollowing)

  if (alreadyFollowing) throw Error('Your have already followed this person')

  // console.log({ followId, loginUserId })
  // 1. find user you want to follow and update their followers field with the follower id
  await User.findByIdAndUpdate(
    followId,
    {
      $push: { followers: loginUserId },
      isFollowing: true,
    },
    { new: true }
  )
  // 2. update the login user following field
  await User.findByIdAndUpdate(
    loginUserId,
    {
      $push: { following: followId },
    },
    { new: true }
  )
  res.json('You have successfully follow')
})

//=== UnFollow ===
const unFollowUsersCtrl = expressAsyncHandler(async (req, res) => {
  const { unfollowId } = req.body
  const loginUserId = req.user._id

  //remove the login user from the follower account
  await User.findByIdAndUpdate(
    unfollowId,
    {
      $pull: { followers: loginUserId },
      isFollowing: false,
    },
    {
      new: true,
    }
  )

  await User.findByIdAndUpdate(
    loginUserId,
    {
      $pull: { following: unfollowId },
    },
    {
      new: true,
    }
  )

  res.json('You have successfully unfollow')
})

//=== Block user ===
//only admin can block user
const blockUserCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params

  validateMongodbId(id)

  //find user
  const user = await User.findByIdAndUpdate(
    id,
    {
      isBlocked: true,
    },
    {
      new: true,
    }
  )
  res.json(user)
})

//=== unblock user ===
const unBlockUserCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params

  validateMongodbId(id)

  //find user
  const user = await User.findByIdAndUpdate(
    id,
    {
      isBlocked: false,
    },
    {
      new: true,
    }
  )
  res.json(user)
})

//=== Generate email varification - send email:learn to send email with sendgrid
const generateEmailVerificationTokenCtrl = expressAsyncHandler(
  async (req, res) => {
    const loginUserId = req.user.id
    // console.log('Here is the loginUser:- ', loginUser)

    // find user in database
    const user = await User.findById(loginUserId)
    try {
      // generate token
      const verificationToken = await user.createAccountVerificationToken()
      // save user in database
      await user.save()

      const resetURL = `Please verify your account with in 10 minutes. <button href="https://localhost: 3000/verify-account/${verificationToken}">Click to verify your account</button>`

      //build messages
      const msg = {
        to: 'sinnang.noi@gmail.com', // Change to your recipient
        from: 'noi.patsin@gmail.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: resetURL,
      }

      await sgMail.send(msg)
      res.json(resetURL)
    } catch (error) {
      res.json(error)
    }
  }
)

//=== Account verification
const accountVerificationCtrl = expressAsyncHandler(async (req, res) => {
  const { token } = req.body
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex')
  // res.json(hashedToken)

  const userFound = await User.findOne({
    accountVerificationToken: hashedToken,
    // get the value of accountVerificationTokenExpireds from database
    accountVerificationTokenExpires: { $gt: new Date() },
  })
  // check if the token is expired
  if (!userFound) throw new Error('Token expired')

  // reset
  userFound.isAccountVerified = true
  userFound.accountVerificationToken = undefined
  userFound.accountVerificationTokenExpires = undefined
  await userFound.save()
  res.json(userFound)
})

/* === Forget password === 
  1. generate token and send it to the user
  2. find user by the token -- and -- create a controller to update the password
*/

// === Forget token generator
const forgetPasswordTokenCtrl = expressAsyncHandler(async (req, res) => {
  // find user by email
  const { email } = req.body

  const user = await User.findOne({ email })

  if (!user) throw new Error('User not found')
  res.send('forget password')

  // if user is found -- create token -- send it to the user
  try {
    // add token to a variable
    const token = await user.createPasswordResetToken()
    await user.save()
  } catch (error) {
    res.json(error)
  }
})

module.exports = {
  userRegisterCtrl,
  userLoginCtrl,
  fetchUsersCtrl,
  fetchUserDetailsCtrl,
  deleteUsersCtrl,
  userProfileCtrl,
  updateUserProfileCtrl,
  updateUserPasswordCtrl,
  followingUsersCtrl,
  unFollowUsersCtrl,
  blockUserCtrl,
  unBlockUserCtrl,
  generateEmailVerificationTokenCtrl,
  accountVerificationCtrl,
  forgetPasswordTokenCtrl,
}
