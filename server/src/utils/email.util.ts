/**
 * Title: Write a program using JavaScript on Email Util
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

import nodemailer, { SentMessageInfo } from 'nodemailer'

export const mailSender = async (
  email: string,
  title: string,
  body: string,
): Promise<SentMessageInfo> => {
  try {
    console.log('Host: ', process.env.MAIL_HOST);
    console.log('User: ', process.env.MAIL_USER);
    console.log('Pass: ', process.env.MAIL_PASS);

    // Create a Transporter to send emails
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    })

    // Send emails to users
    const info: SentMessageInfo = await transporter.sendMail({
      from: `${process.env.MAIL_USER} ${process.env.APP_NAME} Support`,
      to: email,
      subject: title,
      html: body,
    })

    console.log('Email info: ', info)

    return info
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error('An unknown error occurred')
    }
    throw new Error('Failed to send email, retry')
  }
}
