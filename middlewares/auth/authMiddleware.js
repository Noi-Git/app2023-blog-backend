const expressAsyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const User = require('../../model/user/User')

const authMiddleware = expressAsyncHandler(async (req, res, next) => {
  let token

  if (req?.headers?.authorization?.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        //find user by id
        const user = await User.findByID(decoded?.id).select('-password')
        //append user to the request object
        req.user = user
      } else {
        throw new Error('There is no token attatched to the header')
      }
    } catch (error) {
      throw new Error('Not authorized, Please login again')
    }
  }
})

module.exports = authMiddleware
