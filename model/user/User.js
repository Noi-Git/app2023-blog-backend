const mongoose = require('mongoose')

// create schema

const userSchema = new mongoose.Schema({
  firstName: {
    required: [true, 'First name is required'],
    type: String,
  },
  lastName: {
    required: [true, 'Last name is required'],
    type: String,
  },
  profilePhoto: {
    type: String,
    default:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
  },
})
