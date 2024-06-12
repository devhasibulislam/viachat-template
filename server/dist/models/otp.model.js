"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const email_util_1 = require("../utils/email.util");
const otpSchema = new mongoose_1.default.Schema({
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
});
// Define a function to send emails
function sendVerificationEmail(name, email, otp) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mailResponse = yield (0, email_util_1.mailSender)(email, `Email Verification - ${process.env.APP_NAME}`, `
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
        `);
            console.log('Email sent successfully: ', mailResponse);
        }
        catch (error) {
            console.log('Error occurred while sending email: ', error);
            throw error;
        }
    });
}
otpSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('New document saved to the database');
        // Only send an email when a new document is created
        if (this.isNew) {
            yield sendVerificationEmail(this.name, this.email, this.otp);
        }
        next();
    });
});
const OTP = mongoose_1.default.model('OTP', otpSchema);
exports.default = OTP;
