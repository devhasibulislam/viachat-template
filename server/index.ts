/**
 * Title: Write a program using JavaScript on Index
 * Author: Hasibul Islam
 * Portfolio: https://devhasibulislam.vercel.app
 * Linkedin: https://linkedin.com/in/devhasibulislam
 * GitHub: https://github.com/devhasibulislam
 * Facebook: https://facebook.com/devhasibulislam
 * Instagram: https://instagram.com/devhasibulislam
 * Twitter: https://twitter.com/devhasibulislam
 * Pinterest: https://pinterest.com/devhasibulislam
 * WhatsApp: https://wa.me/8801906315901
 * Telegram: devhasibulislam
 * Date: 03, December 2023
 */

/* external imports */
import mongoose from "mongoose";
import * as dotenv from "dotenv";

/* internal imports */
import app from "./app.js";
dotenv.config();

const port = process.env.PORT;

/* database connection */
const mongodbUri: string =
  process.env.ATLAS_URI || "mongodb://localhost:27017/viachat-template";
mongoose
  .connect(mongodbUri)
  .then(() => console.log("Connected to MongoDB."))
  .catch((error: any) => {
    if (error instanceof Error && error.message) {
      console.error(error.message);
    } else {
      console.error("An unknown error occurred.");
    }
  });

/* establish server port */
app.listen(port, () => {
  console.warn(`Apps is running on port ${port}.`);
});
