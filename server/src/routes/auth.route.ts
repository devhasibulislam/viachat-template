/**
 * Title: Write a program using JavaScript on Auth Route
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

/* external import */
import express, { Request, Response, NextFunction } from 'express'

/* internal import */
import {
  accountRegistration,
  accountLogin,
  accountReset,
  verifyAccountReset,
  confirmAccountPersist,
  accountPersist,
} from '../controllers/auth.controller'
import verify from '../middleware/verify.middleware'

/* router level connection */
const router = express.Router()

/* router methods integration */
// account registration
router.post('/register', (req: Request, res: Response, next: NextFunction) =>
  accountRegistration(req, res, next),
)
// account login
router.post('/login', (req: Request, res: Response, next: NextFunction) =>
  accountLogin(req, res, next),
)
// password reset
router
  .route('/reset')
  .post((req: Request, res: Response, next: NextFunction) =>
    accountReset(req, res, next),
  )
  .get((req: Request, res: Response, next: NextFunction) =>
    verifyAccountReset(req, res, next),
  )
  .put((req: Request, res: Response, next: NextFunction) =>
    confirmAccountPersist(req, res, next),
  )
// login persist
router.get('/me', verify, (req: Request, res: Response, next: NextFunction) =>
  accountPersist(req, res, next),
)

/* export user router */
export default router
