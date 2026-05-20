const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: 'dnyevlhh7',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const folder = process.argv[2] || 'onbalon/male-zestawy'

cloudinary.api.resources({ type: 'upload', prefix: folder, max_results: 100 })
  .then(res => {
    console.log(`\nFolder: ${folder} (${res.resources.length} files)\n`)
    res.resources.forEach(r => console.log(r.public_id))
  })
  .catch(err => console.error(err))
