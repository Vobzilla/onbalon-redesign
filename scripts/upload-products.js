const cloudinary = require('cloudinary').v2
const path = require('path')

cloudinary.config({
  cloud_name: 'dnyevlhh7',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// [localFilePath, publicId]  (publicId = folder/name, no extension)
const files = [
  ['C:/Users/tymvo/OneDrive/Рабочий стол/товари/new/IMG_1904.JPG', 'onbalon/dla-niego/dla-niego-25'],
]

;(async () => {
  for (const [file, publicId] of files) {
    try {
      const res = await cloudinary.uploader.upload(file, { public_id: publicId, overwrite: false })
      console.log(`OK  ${path.basename(file)} -> ${res.public_id}`)
    } catch (err) {
      console.error(`FAIL ${path.basename(file)}:`, err.message)
    }
  }
})()
