/**
 * Title: Write a program using JavaScript on Otp Controller
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
import * as otpService from '../services/otp.service'

// Type imports from express
import { Request, Response, NextFunction } from 'express'

// Function to send OTP
export const sendOTP = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await otpService.sendOTP(req, res)
  } catch (error) {
    next(error)
  } finally {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`)
  }
}

// Function to verify OTP
export const verifyOTP = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await otpService.verifyOTP(req, res)
  } catch (error) {
    next(error)
  } finally {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`)
  }
}
