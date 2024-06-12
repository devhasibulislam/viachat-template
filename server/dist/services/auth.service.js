"use strict";
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
exports.accountPersist = exports.confirmAccountReset = exports.verifyAccountReset = exports.accountReset = exports.accountLogin = exports.accountRegistration = void 0;
const otp_generator_1 = __importDefault(require("otp-generator"));
/* internal imports */
const user_model_1 = __importDefault(require("../models/user.model"));
const token_util_1 = __importDefault(require("../utils/token.util"));
const crypto_1 = __importDefault(require("crypto"));
const email_util_1 = require("../utils/email.util");
const otp_model_1 = __importDefault(require("../models/otp.model"));
/* account registration */
const accountRegistration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
        res.status(400).json({
            acknowledgement: false,
            message: 'Bad Request',
            description: 'Payload is required',
        });
    }
    else {
        const user = yield user_model_1.default.findOne({ email: req.body.email });
        if (user) {
            res.status(409).json({
                acknowledgement: false,
                message: 'Conflict',
                description: 'Email already exists',
            });
        }
        else {
            const otp = otp_generator_1.default.generate(5, {
                digits: true,
                lowerCaseAlphabets: false,
                upperCaseAlphabets: false,
                specialChars: false,
            });
            const otpResult = yield otp_model_1.default.create({
                name: req.body.name,
                email: req.body.email,
                otp,
            });
            if (!otpResult) {
                res.status(500).json({
                    acknowledgement: false,
                    message: 'Internal Server Error',
                    description: 'Failed to create OTP',
                });
            }
            else {
                const userResult = yield user_model_1.default.create(Object.assign(Object.assign({}, req.body), { otp: otpResult._id }));
                if (!userResult) {
                    res.status(400).json({
                        acknowledgement: false,
                        message: 'Bad Request',
                        description: 'Check given info to recreate user',
                    });
                }
                else {
                    res.status(201).json({
                        acknowledgement: true,
                        message: 'Created',
                        description: 'Check email to verify OTP',
                    });
                }
            }
        }
    }
});
exports.accountRegistration = accountRegistration;
/* account login */
const accountLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email || !req.body.password) {
        res.status(400).json({
            acknowledgement: false,
            message: 'Bad Request',
            description: 'Email and password are required',
        });
    }
    else {
        const user = yield user_model_1.default.findOne({ email: req.body.email });
        if (!user) {
            res.status(404).json({
                acknowledgement: false,
                message: 'Not Found',
                description: 'User not found',
            });
        }
        else {
            const isValid = user.comparePassword(req.body.password, user.password);
            if (!isValid) {
                res.status(401).json({
                    acknowledgement: false,
                    message: 'Unauthorized',
                    description: 'Invalid password',
                });
            }
            else {
                if (user.status === 'inactive') {
                    res.status(401).json({
                        acknowledgement: false,
                        message: 'Unauthorized',
                        description: 'Your account is not active',
                    });
                }
                else {
                    const otp = yield otp_model_1.default.findById(user.otp);
                    if (otp && otp.status === 'unverified') {
                        res.status(401).json({
                            acknowledgement: false,
                            message: 'Unauthorized',
                            description: 'Your account is not verified',
                        });
                    }
                    else {
                        const accessToken = (0, token_util_1.default)({
                            _id: user._id,
                            name: user.name,
                            email: user.email,
                            role: user.role,
                            status: user.status,
                        });
                        res.status(200).json({
                            acknowledgement: true,
                            message: 'OK',
                            description: 'User logged in successfully',
                            accessToken,
                        });
                    }
                }
            }
        }
    }
});
exports.accountLogin = accountLogin;
/* password reset */
const accountReset = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email) {
        res.status(400).json({
            acknowledgement: false,
            message: 'Bad Request',
            description: 'Email is required',
        });
    }
    else {
        const user = yield user_model_1.default.findOne({ email: req.body.email });
        if (!user) {
            res.status(404).json({
                acknowledgement: false,
                message: 'Not Found',
                description: 'Try with a valid email address',
            });
        }
        else {
            const resetToken = crypto_1.default.randomUUID();
            const mailResponse = yield (0, email_util_1.mailSender)(user.email, `Reset Password - ${process.env.APP_NAME}`, `
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
                href="${req.protocol}://${req.get('host')}${req.originalUrl}?token=${resetToken}"
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
        `);
            if (!mailResponse) {
                res.status(400).json({
                    acknowledgement: false,
                    message: 'Bad Request',
                    description: 'Failed to send password reset link',
                });
            }
            else {
                user.resetToken = resetToken;
                user.status = 'inactive';
                yield user.save({ validateBeforeSave: false });
                res.status(200).json({
                    acknowledgement: true,
                    message: 'OK',
                    description: 'Reset link sent successfully',
                });
            }
        }
    }
});
exports.accountReset = accountReset;
const verifyAccountReset = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.token) {
        res.status(400).json({
            acknowledgement: false,
            message: 'Bad Request',
            description: 'Token is required',
        });
    }
    const user = yield user_model_1.default.findOne({ resetToken: req.query.token });
    if (!user) {
        res.status(404).json({
            acknowledgement: false,
            message: 'Not Found',
            description: 'Invalid token',
        });
    }
    else {
        res.redirect(`${process.env.ORIGIN_URL}/reset?token=${req.query.token}`);
    }
});
exports.verifyAccountReset = verifyAccountReset;
const confirmAccountReset = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email || !req.body.password) {
        res.status(400).json({
            acknowledgement: false,
            message: 'Bad Request',
            description: 'Email and password are required',
        });
    }
    if (!req.query.token) {
        res.status(400).json({
            acknowledgement: false,
            message: 'Bad Request',
            description: 'Token is required',
        });
    }
    const user = yield user_model_1.default.findOne({
        resetToken: req.query.token,
        email: req.body.email,
    });
    if (!user) {
        res.status(404).json({
            acknowledgement: false,
            message: 'Not Found',
            description: 'No user found with this token',
        });
    }
    else {
        const result = yield user_model_1.default.findByIdAndUpdate(user === null || user === void 0 ? void 0 : user._id, {
            $set: {
                password: user.encryptedPassword(req.body.password),
                status: 'active',
            },
            $unset: { resetToken: 1 },
        }, {
            runValidators: true,
            returnOriginal: false,
        });
        if (!result) {
            res.status(400).json({
                acknowledgement: false,
                message: 'Bad Request',
                description: 'Failed to reset password',
            });
        }
        else {
            res.status(200).json({
                acknowledgement: true,
                message: 'OK',
                description: 'Password reset successfully',
            });
        }
    }
});
exports.confirmAccountReset = confirmAccountReset;
/* persist login */
const accountPersist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(404).json({
            acknowledgement: false,
            message: 'Not Found',
            description: 'Please, login to continue',
        });
        return;
    }
    const user = yield user_model_1.default.findById(req.user._id).select('-password');
    if (!user) {
        res.status(404).json({
            acknowledgement: false,
            message: 'Not Found',
            description: 'Please, login to continue',
        });
    }
    else {
        res.status(200).json({
            acknowledgement: true,
            message: 'OK',
            description: 'Please, continue exploring',
            data: user,
        });
    }
});
exports.accountPersist = accountPersist;
