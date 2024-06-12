/**
 * Title: Write a program using JavaScript on App
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
import express, { Express, Request, Response, NextFunction } from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

/* internal import */
import error from './middleware/error.middleware'
import autRouter from './routes/auth.route'
import otpRouter from './routes/otp.route'

/* application level connection */
let app: Express = express()

/* middleware connections */
app.use(
  cors({
    origin: process.env.ORIGIN_URL,
    methods: 'GET, PUT, POST, DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }),
)
app.use(express.json())

/* router level connections */
app.use('/api/auth', autRouter)
app.use('/api/otp', otpRouter)

/* global error handler */
app.use(error)

/* connection establishment */
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({
      acknowledgement: true,
      message: 'OK',
      description: 'The request is OK',
    })
  } catch (err) {
    next(err)
  } finally {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`)
  }
})

/* export app */
export default app