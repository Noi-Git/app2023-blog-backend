const expressAsyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const User = require('../../model/user/User')

const authMiddleware = expressAsyncHandler(async (req, res, next) => {
  let token

  if (req?.headers?.authorization) {
    try {
      token = req.headers.authorization.split(' ')[1]
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        //find user by id
        const user = await User.findById(decoded?.id).select('-password') //.select('-password'): excludes password

        //append user to the request object

        req.user = user
        next()
      } else {
        throw new Error('There is no token attatched to the header')
      }
    } catch (error) {
      throw new Error('Not authorized, Please login again')
    }
  }
})

module.exports = authMiddleware
