/**
 * Title: Write a program using JavaScript on Token Util
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
import jwt from 'jsonwebtoken'

interface UserPayload {
  _id: string
  name: string
  email: string
  role: string
  status: string
}

function token({ _id, name, email, role, status }: UserPayload): string {
  // grab specific user info to generate jwt token
  const accessToken = jwt.sign(
    {
      _id,
      name,
      email,
      role,
      status,
    },
    process.env.TOKEN_SECRET as string,
    { expiresIn: process.env.TOKEN_EXPIRES as string },
  )

  return accessToken
}

/* export token utility */
export default token
