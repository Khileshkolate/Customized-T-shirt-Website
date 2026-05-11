const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const path = require('path');

const isCloudinaryConfigured = !!process.env.CLOUDINARY_URL;

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloudinary_url: process.env.CLOUDINARY_URL
  });
}

const getStorage = () => {
  if (isCloudinaryConfigured) {
    console.log('[STORAGE] Using Cloudinary for uploads');
    return new CloudinaryStorage({
      cloudinary: cloudinary,
      params: {
        folder: 'customizable_tshirts/mockups',
        allowed_formats: ['jpg', 'png', 'webp'],
        transformation: [{ width: 1200, height: 1200, crop: 'limit' }]
      },
    });
  }

  console.log('[STORAGE] CLOUDINARY_URL not found. Using local disk storage (Warning: Render filesystem is ephemeral)');
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/mockups/');
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const baseName = path.basename(file.originalname, ext)
        .replace(/[^a-z0-9_-]/gi, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 80) || 'mockup';

      cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}-${baseName}${ext}`);
    }
  });
};

module.exports = {
  cloudinary,
  storage: getStorage(),
  isCloudinaryConfigured
};

