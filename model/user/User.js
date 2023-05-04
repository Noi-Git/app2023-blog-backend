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
  isFollowing: {
    type: Boolean,
    default: false,
  },
  isUnFollowing: {
    type: Boolean,
    default: false,
  },
  isAccountVerified: {
    type: Boolean,
    default: false,
  },
  accountVerificationToken: String,
  accountVerificationTokenExpires: Date,
  viewedBy: {
    //database relationship ex. one to many, one to one
    type: [
      // add id of user who view
      {
        type: mongoose.Schema.Types.ObjectId, //save user id in the field
        ref: 'User', // model you want to reference -- the user we want to push to the type:[] -- comes from User model
      },
    ],
  },
  followers: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  following: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  passwordChangeAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: false,
  },
})
