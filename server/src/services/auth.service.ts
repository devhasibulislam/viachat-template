/**
 * Title: Write a program using JavaScript on Auth Service
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

/* external imports */
import { Request, Response } from 'express'
import otpGenerator from 'otp-generator'

/* internal imports */
import User from '../models/user.model'
import token from '../utils/token.util'
import crypto from 'crypto'
import { mailSender } from '../utils/email.util'
import OTP from '../models/otp.model'
import { AuthenticatedRequest } from '../routes/auth.route'

/* account registration */
export const accountRegistration = async (
  req: Request,
  res: Response,
): Promise<void> => {
  if (!req.body) {
    res.status(400).json({
      acknowledgement: false,
      message: 'Bad Request',
      description: 'Payload is required',
    })
  } else {
    const user = await User.findOne({ email: req.body.email })

    if (user) {
      res.status(409).json({
        acknowledgement: false,
        message: 'Conflict',
        description: 'Email already exists',
      })
    } else {
      const otp = otpGenerator.generate(5, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      })

      const otpResult = await OTP.create({
        name: req.body.name,
        email: req.body.email,
        otp,
      })

      if (!otpResult) {
        res.status(500).json({
          acknowledgement: false,
          message: 'Internal Server Error',
          description: 'Failed to create OTP',
        })
      } else {
        const userResult = await User.create({
          ...req.body,
          otp: otpResult._id,
        })

        if (!userResult) {
          res.status(400).json({
            acknowledgement: false,
            message: 'Bad Request',
            description: 'Check given info to recreate user',
          })
        } else {
          res.status(201).json({
            acknowledgement: true,
            message: 'Created',
            description: 'Check email to verify OTP',
          })
        }
      }
    }
  }
}

/* account login */
export const accountLogin = async (
  req: Request,
  res: Response,
): Promise<void> => {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({
      acknowledgement: false,
      message: 'Bad Request',
      description: 'Email and password are required',
    })
  } else {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      res.status(404).json({
        acknowledgement: false,
        message: 'Not Found',
        description: 'User not found',
      })
    } else {
      const isValid = user.comparePassword(req.body.password, user.password)

      if (!isValid) {
        res.status(401).json({
          acknowledgement: false,
          message: 'Unauthorized',
          description: 'Invalid password',
        })
      } else {
        if (user.status === 'inactive') {
          res.status(401).json({
            acknowledgement: false,
            message: 'Unauthorized',
            description: 'Your account is not active',
          })
        } else {
          const otp = await OTP.findById(user.otp)

          if (otp && otp.status === 'unverified') {
            res.status(401).json({
              acknowledgement: false,
              message: 'Unauthorized',
              description: 'Your account is not verified',
            })
          } else {
            const accessToken = token({
              _id: user._id as string,
              name: user.name,
              email: user.email,
              role: user.role,
              status: user.status,
            })

            res.status(200).json({
              acknowledgement: true,
              message: 'OK',
              description: 'User logged in successfully',
              accessToken,
            })
          }
        }
      }
    }
  }
}

/* password reset */
export const accountReset = async (
  req: Request,
  res: Response,
): Promise<void> => {
  if (!req.body.email) {
    res.status(400).json({
      acknowledgement: false,
      message: 'Bad Request',
      description: 'Email is required',
    })
  } else {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      res.status(404).json({
        acknowledgement: false,
        message: 'Not Found',
        description: 'Try with a valid email address',
      })
    } else {
      const resetToken = crypto.randomUUID()

      const mailResponse = await mailSender(
        user.email,
        `Reset Password - ${process.env.APP_NAME}`,
        `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Reset Your Password</title>
            <style>
              body {
                font-family: Calibri, sans-serif;
                font-style: normal;
              }
              .reset_button {
                background-color: #008080 !important;
                width: fit-content;
                padding: 10px 15px;
                color: white !important;
                border-radius: 5px;
                font-size: 14px;
                text-decoration: none;
                margin: 20px 0;
                display: block;
              }
            </style>
          </head>
          <body>
            <section>
              <p>Hello ${user.name},</p>
              <div style="margin-bottom: 10px">
                <span>
                  We received a request to reset your password. Click the button below to
                  choose a new password:
                </span>
                <br />
                <span>
                  Please, click the following One-Time-Link (OTL) below to reset your password:
                </span>
              </div>
              <a
                href="${req.protocol}://${req.get('host')}${
                  req.originalUrl
                }?token=${resetToken}"
                target="_blank"
                class="reset_button"
                >Reset Password</a
              >
              <p>If you didn't request to reset your password, you can ignore this email.</p>
              <p>
                <span>Thanks,</span>
                <br />
                <span style="font-weight: bold">${process.env.APP_NAME} Team</span>
              </p>
            </section>
          </body>
        </html>
        `,
      )

      if (!mailResponse) {
        res.status(400).json({
          acknowledgement: false,
          message: 'Bad Request',
          description: 'Failed to send password reset link',
        })
      } else {
        user.resetToken = resetToken
        user.status = 'inactive'

        await user.save({ validateBeforeSave: false })

        res.status(200).json({
          acknowledgement: true,
          message: 'OK',
          description: 'Reset link sent successfully',
        })
      }
    }
  }
}

export const verifyAccountReset = async (
  req: Request,
  res: Response,
): Promise<void> => {
  if (!req.query.token) {
    res.status(400).json({
      acknowledgement: false,
      message: 'Bad Request',
      description: 'Token is required',
    })
  }

  const user = await User.findOne({ resetToken: req.query.token as string })

  if (!user) {
    res.status(404).json({
      acknowledgement: false,
      message: 'Not Found',
      description: 'Invalid token',
    })
  } else {
    res.redirect(`${process.env.ORIGIN_URL}/reset?token=${req.query.token}`)
  }
}

export const confirmAccountReset = async (
  req: Request,
  res: Response,
): Promise<void> => {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({
      acknowledgement: false,
      message: 'Bad Request',
      description: 'Email and password are required',
    })
  }

  if (!req.query.token) {
    res.status(400).json({
      acknowledgement: false,
      message: 'Bad Request',
      description: 'Token is required',
    })
  }

  const user = await User.findOne({
    resetToken: req.query.token as string,
    email: req.body.email,
  })
  if (!user) {
    res.status(404).json({
      acknowledgement: false,
      message: 'Not Found',
      description: 'No user found with this token',
    })
  } else {
    const result = await User.findByIdAndUpdate(
      user?._id,
      {
        $set: {
          password: user.encryptedPassword(req.body.password),
          status: 'active',
        },
        $unset: { resetToken: 1 },
      },
      {
        runValidators: true,
        returnOriginal: false,
      },
    )

    if (!result) {
      res.status(400).json({
        acknowledgement: false,
        message: 'Bad Request',
        description: 'Failed to reset password',
      })
    } else {
      res.status(200).json({
        acknowledgement: true,
        message: 'OK',
        description: 'Password reset successfully',
      })
    }
  }
}

/* persist login */
export const accountPersist = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  if (!req.user) {
    res.status(404).json({
      acknowledgement: false,
      message: 'Not Found',
      description: 'Please, login to continue',
    })
    return
  }

  const user = await User.findById(req.user._id).select('-password')

  if (!user) {
    res.status(404).json({
      acknowledgement: false,
      message: 'Not Found',
      description: 'Please, login to continue',
    })
  } else {
    res.status(200).json({
      acknowledgement: true,
      message: 'OK',
      description: 'Please, continue exploring',
      data: user,
    })
  }
}
