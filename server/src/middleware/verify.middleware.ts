/**
 * Title: Write a program using JavaScript on Verify Middleware
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
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

interface UserPayload {
  _id: string
  name: string
  email: string
  role: string
  status: string
}

interface AuthenticatedRequest extends Request {
  user?: UserPayload
}

const verify = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // catch the token from user header
    const token = req.headers?.authorization?.split(' ')[1]

    // no token explicitly give error
    if (!token) {
      res.status(401).json({
        acknowledgement: false,
        message: 'Unauthorized',
        description: 'Please, login to continue',
      })

      return
    }

    // fetching token set the user on request
    jwt.verify(token, process.env.TOKEN_SECRET as string, (err, decoded) => {
      if (err) {
        res.status(410).json({
          acknowledgement: false,
          message: 'Token Expired',
          description: 'Please, login to continue',
        })

        return
      }

      req.user = decoded as UserPayload
      next()
    })
  } catch (error) {
    next(error)
  }
}

/* export token verification */
export default verify
