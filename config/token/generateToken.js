const jwt = require('jsonwebtoken')

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, { expiredIn: '20d' })
}

module.exports = generateToken
