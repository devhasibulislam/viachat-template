/**
 * Title: Write a program using JavaScript on Otp Model
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

import mongoose, { Document, Model, Schema } from 'mongoose'
import { mailSender } from '../utils/email.util'

// Define an interface representing a document in MongoDB.
export interface IOtp extends Document {
  name: string
  email: string
  otp: string
  status: string
  createdAt: Date
  updatedAt: Date
}

const otpSchema: Schema<IOtp> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ['verified', 'unverified'],
    default: 'unverified',
  },

  // OTP timeline
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Define a function to send emails
async function sendVerificationEmail(name: string, email: string, otp: string) {
  try {
    const mailResponse = await mailSender(
      email,
      `Email Verification - ${process.env.APP_NAME}`,
      `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Email Verification</title>
            <style>
              body {
                font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
              }
              .otp {
                background-color: #008080;
                width: fit-content;
                padding: 10px 15px;
                color: white;
                border-radius: 5px;
                font-size: 20px;
              }
            </style>
          </head>
          <body>
            <section>
              <p>Hello ${name},</p>
              <div style="margin-bottom: 10px;">
                <span>
                  Thank you for registering with ${process.env.APP_NAME}. To complete your registration,
                  we need to verify your email address.
                </span>
                <br />
                <span>
                  Please, enter the following One-Time-Password (OTP) in the
                  verification field:
                </span>
              </div>
              <p class="otp">
                ${otp}
              </p>
              <p>
                If you did not request this verification then ignore this email.
              </p>
              <p>
                <span>Best regards,</span>
                <br />
                <span style="font-weight: bold;">${process.env.APP_NAME} Team</span>
              </p>
            </section>
          </body>
        </html>
        `,
    )

    console.log('Email sent successfully: ', mailResponse)
  } catch (error) {
    console.log('Error occurred while sending email: ', error)
    throw error
  }
}

otpSchema.pre('save', async function (next) {
  console.log('New document saved to the database')

  // Only send an email when a new document is created
  if (this.isNew) {
    await sendVerificationEmail(this.name, this.email, this.otp)
  }

  next()
})

const OTP: Model<IOtp> = mongoose.model<IOtp>('OTP', otpSchema)

export default OTP
