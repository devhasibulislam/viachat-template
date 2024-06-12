/**
 * Title: Write a program using JavaScript on Otp Service
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

// External imports
import otpGenerator from 'otp-generator'
import { Request, Response } from 'express'
import { ObjectId } from 'mongodb'

// Internal imports
import OTP from '../models/otp.model'
import User from '../models/user.model'

// Function to send OTP
export const sendOTP = async (req: Request, res: Response): Promise<void> => {
  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    res.status(404).json({
      acknowledgement: false,
      message: 'Not Found',
      description: 'User not found',
    })
    return
  }

  const existingUser = await OTP.findOne({ email: user.email })

  if (existingUser) {
    res.status(401).json({
      acknowledgement: true,
      message: 'Unauthorized',
      description: 'User already registered',
    })
    return
  } else {
    const otp = otpGenerator.generate(5, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    })

    const result = await OTP.create({
      name: user.name,
      email: user.email,
      otp,
      status: 'unverified',
    })

    if (!result) {
      res.status(400).json({
        acknowledgement: false,
        message: 'Bad Request',
        description: 'Failed to send OTP',
      })
    } else {
      user.otp = result._id as ObjectId
      await user.save({
        validateBeforeSave: false,
      })

      res.status(200).json({
        acknowledgement: true,
        message: 'OK',
        description: 'OTP sent successfully',
      })
    }
  }
}

// Function to verify OTP
export const verifyOTP = async (req: Request, res: Response): Promise<void> => {
  const otp = req.params.otp

  if (!otp) {
    res.status(400).json({
      acknowledgement: false,
      message: 'Bad Request',
      description: 'Provide OTP for verification',
    })
    return
  }

  const result = await OTP.findOne({ otp })
  if (!result) {
    res.status(404).json({
      acknowledgement: false,
      message: 'Not Found',
      description: 'Please, provide a valid OTP',
    })
    return
  }

  const user = await User.findOne({ email: result.email })

  if (result.status === 'unverified') {
    result.status = 'verified'
    await result.save({
      validateBeforeSave: false,
    })

    if (user) {
      user.status = 'active'
      await user.save({
        validateBeforeSave: false,
      })
    }

    res.status(200).json({
      acknowledgement: true,
      message: 'OK',
      description: 'Account successfully verified',
    })
  } else {
    res.status(400).json({
      acknowledgement: false,
      message: 'Bad Request',
      description: 'Account already verified',
    })
  }
}
