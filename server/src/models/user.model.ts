/**
 * Title: Write a program using JavaScript on User Model
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
import bcrypt from 'bcryptjs'

// Define an interface representing a document in MongoDB.
export interface IUser extends Document {
  avatar: {
    url: string
    public_id: string
  }
  name: string
  email: string
  password: string
  role: 'admin' | 'user'
  status: 'active' | 'inactive'
  otp?: mongoose.Types.ObjectId
  resetToken?: string
  createdAt: Date
  updatedAt: Date
  encryptedPassword(password: string): string
  comparePassword(password: string, hash: string): boolean
}

// Create a Schema corresponding to the document interface.
const userSchema: Schema<IUser> = new Schema(
  {
    // user information
    // avatar: {
    //   url: {
    //     type: String,
    //     required: [true, 'Please, provide a valid avatar URL'],
    //   },
    //   public_id: {
    //     type: String,
    //     required: [true, 'Please, provide the avatar public id'],
    //   },
    // },
    name: {
      type: String,
      required: [true, 'Please, provide your full name'],
    },
    email: {
      type: String,
      required: [true, 'Please, provide a valid email address'],
      unique: true, // Change this to boolean
    },
    password: {
      type: String,
      required: [true, 'Please, provide a strong password'],
    },
    role: {
      type: String,
      required: [true, 'Please, choose one that suits you'],
      enum: ['admin', 'user'],
      default: 'user',
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'inactive',
    },

    // rest info based on user
    otp: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'OTP',
    },
    resetToken: {
      type: String,
      lowercase: true,
      unique: true, // Change this to boolean
    },

    // user account timing
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
)

/* encrypt user password */
userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  try {
    this.password = this.encryptedPassword(this.password)
    next()
  } catch (error) {
    next(error as any)
  }
})

/* hash user password */
userSchema.methods.encryptedPassword = function (password: string): string {
  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(password, salt)

  return hashedPassword
}

/* compare user password */
userSchema.methods.comparePassword = function (
  password: string,
  hash: string,
): boolean {
  return bcrypt.compareSync(password, hash)
}

// Create a Model.
const User: Model<IUser> = mongoose.model<IUser>('User', userSchema)

export default User
