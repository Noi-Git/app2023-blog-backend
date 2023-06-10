const expressAsyncHandler = require('express-async-handler')
const Filter = require('bad-words')
const fs = require('fs')
const Post = require('../../model/post/Post')
const validateMongodbId = require('../../utils/validateMongodbID')
const User = require('../../model/user/User')
const cloudinaryUploadImg = require('../../utils/cloudinary')

//=== Create Post ===
const createPostCtrl = expressAsyncHandler(async (req, res) => {
  console.log(req.file)
  const { _id } = req.user
  //   validateMongodbId(req.body.user);
  //Check for bad words
  const filter = new Filter()
  const isProfane = filter.isProfane(req.body.title, req.body.description)
  //Block user
  if (isProfane) {
    await User.findByIdAndUpdate(_id, {
      isBlocked: true,
    })
    throw new Error(
      'Creating Failed because it contains profane words and you have been blocked'
    )
  }

  //1. Get the oath to img
  const localPath = `public/images/posts/${req.file.filename}`
  //2.Upload to cloudinary
  const imgUploaded = await cloudinaryUploadImg(localPath)
  try {
    const post = await Post.create({
      ...req.body,
      image: imgUploaded?.url,
      user: _id,
    })
    res.json(post)
    // res.json(imgUploaded)
    //Remove uploaded img
    fs.unlinkSync(localPath)
  } catch (error) {
    res.json(error)
  }
})

//=== Fetch All Post ===
const fetchAllPostsCtrl = expressAsyncHandler(async (req, res) => {
  res.json('fetch post')
})

module.exports = { createPostCtrl, fetchAllPostsCtrl }
