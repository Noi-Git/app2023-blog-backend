const jwt = require('jsonwebtoken')

const generateToken = (id) => {
  return jwt.sign({ id }, 'mykeys', { expiredIn: '20d' })
}
