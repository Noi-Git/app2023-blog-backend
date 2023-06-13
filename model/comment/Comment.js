const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
  {
    //One to Many relationship -- one post can have manny comments
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: [true, 'Post is required'], //custom message
    },
    //One to Many relationship -- one user can create manny comments
    user: {
      type: Object, //user need to login in order to create post
      required: [true, 'User is required'], //custom message
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
  },
  { timestamps: true } //automatically generate timestamp
)

const Comment = mongoose.model('Comment', commentSchema)
