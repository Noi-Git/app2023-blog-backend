const multer = require('multer')

//use multer storeage to temporary save our image
const multerStorage = multer.memoryStorage()

//file type checking -- cb = callback
const multerFilter = (req, file, cb) => {
  //check file type
  if (file.mineType.startWith('image')) {
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
})

module.exports = { profilePhotoUpload }
