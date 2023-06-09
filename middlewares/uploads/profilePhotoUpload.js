const multer = require('multer')
const sharp = require('sharp')

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

const profilePhotoUpload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 1000000 }, //1 MB
})

//=== Image resizing ===
const profilePhotoResize = (req, res, next) => {
  //check if there is no file to resize
  if (!req.file) return next()

  req.file.filename = `user-${Date.now()}-${req.file.originalname}`

  console.log('Resize:- ', req.file)
}

module.exports = { profilePhotoUpload, profilePhotoResize }
