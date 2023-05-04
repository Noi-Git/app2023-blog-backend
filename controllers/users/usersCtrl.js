const User = require('../../model/user/User')

//Register
const userRegisterCtrl = async (req, res) => {
  const user = await User.create({
    firstName: 'Emma',
    lastName: 'Ben',
    email: 'Emma@gmail.com',
    password: 12345,
  })

  res.json({ user: 'User Registered' })
}

module.exports = { userRegisterCtrl }
