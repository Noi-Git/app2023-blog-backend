const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')

// create schema

const UserSchema = new mongoose.Schema(
  {
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
      type: String,
    },
    bio: {
      type: String,
    },
    password: {
      required: [true, 'Password is required'],
      type: String,
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
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
)

//=== Virtual method to populate created post ===
//-- attatch user post to virtuals objects
UserSchema.virtual('posts', {
  ref: 'Post', //reference to post model
  foreignField: 'user', //'user' has to be the same as #42 in post model user: {}
  localField: '_id',
})

// === custom middleware to handle hashing password
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    // console.log('isModified:: ', isModified())
    next()
  } // this one doesn't work

  const salt = await bcrypt.genSalt(10)
  // if (!this.isModified('password')) {
  //   next()
  // }
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

//match password using mongoose methods
UserSchema.methods.isPasswordMatched = async (enteredPassword) => {
  const isMatched = await bcrypt.compare(enteredPassword, this.password)
  // console.log('Password matched:', isMatched)
  return isMatched

  // return await bcrypt.compare(enteredPassword, this.password)
}

// Verify account
UserSchema.methods.createAccountVerificationToken = async function () {
  // need to use function decoration here, otherwise the token wouldn't save to db
  //generate token with crypto
  const verificationToken = crypto.randomBytes(32).toString('hex')
  this.accountVerificationToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex')
  this.accountVerificationTokenExpires = Date.now() + 30 * 60 * 1000 // 10 minutes

  return verificationToken
}

// Reset password / Forget password
UserSchema.methods.createPasswordResetToken = async function () {
  const resetToken = crypto.randomBytes(32).toString('hex')
  // console.log({ resetToken })
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')
  this.passwordResetExpires = Date.now() + 30 * 60 * 1000 // 10 minutes

  return resetToken
}

//Compile schema into model
const User = mongoose.model('User', UserSchema)

module.exports = User
