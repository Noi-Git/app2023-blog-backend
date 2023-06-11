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
  // validateMongodbId(req.body.user)
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
  const localPath = `public/images/profile/${req.file.filename}`
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
  try {
    const posts = await Post.find({}).populate('user')
    res.json(posts)
  } catch (error) {}
})

//=== Fetch a Single Post ===
const fetchPostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongodbId(id)

  try {
    const post = await Post.findById(id).populate('user')

    //update number of views
    await Post.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 },
      },
      { new: true }
    )

    res.json(post)
  } catch (error) {
    res.json(error)
  }
})

//=== Update posts ===
const updatePostCtrl = expressAsyncHandler(async (req, res) => {
  console.log(req.user)
  // console.log(req.params.id)
  const { id } = req.params
  validateMongodbId(id)

  try {
    const post = await Post.findByIdAndUpdate(
      id,
      {
        ...req.body,
        user: req.user?.id,
      },
      { new: true }
    )
    res.json(post)
  } catch (error) {
    res.json(error)
  }
})

//=== Delete posts ===
const deletePostCtrl = expressAsyncHandler(async (req, res) => {
  res.json('delete')
})

module.exports = {
  createPostCtrl,
  fetchAllPostsCtrl,
  fetchPostCtrl,
  updatePostCtrl,
  deletePostCtrl,
}
