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
import * as dotenv from "dotenv";

/* internal imports */
import connectDB from "./utils/database.util";
import app from "./app";
dotenv.config();

const port = process.env.PORT;

/* database connection */
connectDB();

/* establish server port */
app.listen(port, () => {
  console.warn(`Apps is running on port ${port}.`);
});
