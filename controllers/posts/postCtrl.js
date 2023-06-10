const expressAsyncHandler = require('express-async-handler')
const Filter = require('bad-words')
const Post = require('../../model/post/Post')
const validateMongodbId = require('../../utils/validateMongodbID')
const User = require('../../model/user/User')
const cloudinaryUploadImg = require('../../utils/cloudinary')

const createPostCtrl = expressAsyncHandler(async (req, res) => {
  console.log(req.file)
  const { _id } = req.user
  // res.json('Post controller')
  validateMongodbId(req.body.user)
  // check for bad words
  const filter = new Filter()
  const isProfane = filter.isProfane(req.body.title, req.body.description)
  // console.log(isProfane)

  //Block user
  if (isProfane) {
    await User.findByIdAndUpdate(_id, {
      isBlocked: true,
    })
    throw new Error(
      'Content contains profane word! Your account has been block.'
    )
  }

  //1. get the path to the image file
  const localPath = `public/images/posts/${req.file.filename}`

  //2. upload to cloudinary
  const imgUploaded = await cloudinaryUploadImg(localPath)

  console.log(imgUploaded)

  // try {
  //   const post = await Post.create(req.body)
  //   res.json(post)
  // } catch (error) {
  //   res.json(error)
  // }
})

module.exports = { createPostCtrl }
