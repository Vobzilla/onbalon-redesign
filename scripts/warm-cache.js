const cloudinary = require('cloudinary').v2
const fs = require('fs')
const path = require('path')

cloudinary.config({
  cloud_name: 'dnyevlhh7',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Must match next.config.js images.deviceSizes + images.imageSizes
const WIDTHS = [64, 128, 256, 384, 640, 828, 1200, 1920]

const productsSrc = fs.readFileSync(path.join(__dirname, '../data/products.ts'), 'utf8')

// Extract every `image: \`${CDN}/...\`` or `image: \`${BASE}/...\`` entry
const matches = [...productsSrc.matchAll(/image:\s*`\$\{(CDN|BASE)\}\/([^`]+)`/g)]

const publicIds = [...new Set(
  matches.map(([, base, rest]) => (base === 'CDN' ? `onbalon/${rest}` : rest))
)]

console.log(`Found ${publicIds.length} unique images. Queuing eager transforms for ${WIDTHS.length} sizes each...`)

;(async () => {
  let ok = 0
  let fail = 0
  for (const publicId of publicIds) {
    try {
      await cloudinary.uploader.explicit(publicId, {
        type: 'upload',
        eager_async: true,
        eager: WIDTHS.map(w => ({
          width: w,
          crop: 'limit',
          quality: 'auto:good',
          fetch_format: 'auto',
        })),
      })
      ok++
    } catch (err) {
      fail++
      console.error(`FAIL ${publicId}:`, err.message)
    }
  }
  console.log(`Done. Queued: ${ok}, Failed: ${fail}`)
  console.log('Cloudinary processes the queue in the background — give it a few minutes.')
})()
