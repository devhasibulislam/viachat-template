/**
 * Title: Write a program using JavaScript on Upload Middleware
 * Author: Hasibul Islam
 * Portfolio: https://devhasibulislam.vercel.app
 * Linkedin: https://linkedin.com/in/devhasibulislam
 * GitHub: https://github.com/devhasibulislam
 * Facebook: https://facebook.com/devhasibulislam
 * Instagram: https:/instagram.com/devhasibulislam
 * Twitter: https://twitter.com/devhasibulislam
 * Pinterest: https://pinterest.com/devhasibulislam
 * WhatsApp: https://wa.me/8801906315901
 * Telegram: devhasibulislam
 * Date: 12, June 2024
 */

/* external imports */
import { v2 as cloudinary, ConfigOptions } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer, { FileFilterCallback } from 'multer'
import path from 'path'
import { Request } from 'express'

/* cloudinary config */
const cloudinaryConfig: ConfigOptions = {
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
}

cloudinary.config(cloudinaryConfig)

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (_: Request, file: Express.Multer.File) => {
    return {
      folder: `${process.env.APP_NAME}`,
      public_id: `${Date.now()}_${file.originalname
        .replace(/[^\w\s.-]/g, '')
        .replace(/\s+/g, '-')
        .toLowerCase()}`,
    }
  },
})

const fileFilter = (
  _: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  const supportedImage = /jpg|png|jpeg/i
  const extension = path.extname(file.originalname)

  if (supportedImage.test(extension)) {
    cb(null, true)
  } else {
    cb(new Error('Must be a png/jpg/jpeg format'))
  }
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
})

export default upload
