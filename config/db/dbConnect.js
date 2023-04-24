const mongoose = require('mongoose')

const dbConnect = async () => {
  try {
    await mongoose.connect('connection String', {
      userCreateIndex: true,
      userFindAndModify: true,
      userUnifiedTopology: true,
      userNewUrlParser: false,
    })
    console.log('If everything is good: DB connected Successful')
  } catch (error) {
    console.log(` Error ${error.message}`)
  }
}

module.exports = dbConnect
