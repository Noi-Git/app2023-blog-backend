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
  email: {
    required: [true, 'Email is required'],
    type: Stirng,
  },
  bio: {
    type: String,
  },
  password: {
    required: [true, 'Password is required'],
    type: string,
  },
  postCount: {
    type: Number,
    default: 0,
  },
  isBlocked: {
    //use this in the frontend
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  role: {
    //use this in the frontend
    type: String,
    enum: ['Admin', 'Guest', 'Blogger'], //use enum to create series of roles
  },
})
