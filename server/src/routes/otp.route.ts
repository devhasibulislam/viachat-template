/**
 * Title: Write a program using JavaScript on Otp Route
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
 * Date: 11, June 2024
 */

// external import
import express, { Router } from 'express'

// internal import
import * as otpController from '../controllers/otp.controller'

// router level connection
const router: Router = express.Router()

// router methods integration
// send otp
router.post('/send-otp', otpController.sendOTP)

// verify otp
router.get('/verify-otp/:otp', otpController.verifyOTP)

// export user router
export default router
