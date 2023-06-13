const multer = require('multer')
const sharp = require('sharp')
const path = require('path')

//use multer storeage to temporary save our image
const multerStorage = multer.memoryStorage()

//file type checking -- cb = callback
const multerFilter = (req, file, cb) => {
  //check file type
  if (file.mimetype.startsWith('image')) {
    // null = successful
    cb(null, true)
  } else {
    //reject file upload
    cb({ message: 'Unsupported file format' }, false)
  }
}

const photoUpload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 1000000 }, //1 MB
})

//=== Image resizing ===
const profilePhotoResize = async (req, res, next) => {
  //check if there is no file to resize
  if (!req.file) return next()

  req.file.filename = `user-${Date.now()}-${req.file.originalname}`

  await sharp(req.file.buffer)
    .resize(250, 250)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(path.join(`public/images/profile/${req.file.filename}`))
  next()

  console.log('Resize:- ', req.file)
}

//=== PostImage resizing ===
const postImageResize = async (req, res, next) => {
  //check if there is no file
  if (!req.file) return next()
  req.file.filename = `user-${Date.now()}-${req.file.originalname}`

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(path.join(`public/images/posts/${req.file.filename}`))
  next()
}

module.exports = { photoUpload, profilePhotoResize, postImageResize }
