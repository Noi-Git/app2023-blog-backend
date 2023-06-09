const cloudinary = require('cloudinary')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const cloudinaryUploadImg = async (fileToUpload) => {
  try {
    const data = await cloudinary.v2.uploader.upload(fileToUpload, {
      resource_type: 'auto',
    })
    // return data
    return {
      url: data?.secure_url,
    }
  } catch (error) {
    return error
  }
}

module.exports = cloudinaryUploadImg
