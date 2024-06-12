/**
 * Title: Write a program using JavaScript on Auth Controller
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

/* internal imports */
import { AuthenticatedRequest } from '../routes/auth.route'
import * as userService from '../services/auth.service'
import { Request, Response, NextFunction } from 'express'

/* account registration */
export const accountRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await userService.accountRegistration(req, res)
  } catch (error) {
    next(error)
  } finally {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`)
  }
}

/* account login */
export const accountLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await userService.accountLogin(req, res)
  } catch (error) {
    next(error)
  } finally {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`)
  }
}

/* password reset */
export const accountReset = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await userService.accountReset(req, res)
  } catch (error) {
    next(error)
  } finally {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`)
  }
}

export const verifyAccountReset = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await userService.verifyAccountReset(req, res)
  } catch (error) {
    next(error)
  } finally {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`)
  }
}

export const confirmAccountReset = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await userService.confirmAccountReset(req, res)
  } catch (error) {
    next(error)
  } finally {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`)
  }
}

/* persist login */
export const accountPersist = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    await userService.accountPersist(req, res)
  } catch (error) {
    next(error)
  } finally {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`)
  }
}
