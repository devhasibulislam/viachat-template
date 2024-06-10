/**
 * Title: Write a program using JavaScript on Database Util
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
 * Date: 09, June 2024
 */

import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

let connection: typeof mongoose | null = null

const connectDB = async () => {
  try {
    if (connection) return

    if (!process.env.ATLAS_URI) {
      throw new Error('ATLAS_URI is not defined in the environment variables.')
    }

    connection = await mongoose.connect(process.env.ATLAS_URI, {})
    console.info('Successfully connected to MongoDB')
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

export default connectDB
