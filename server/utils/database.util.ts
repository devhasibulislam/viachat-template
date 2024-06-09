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

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

let connection: Promise<typeof mongoose> | null = null;

const connectDB = async () => {
  try {
    if (connection) return;

    connection = await mongoose.connect(process.env.ATLAS_URI, {});
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
