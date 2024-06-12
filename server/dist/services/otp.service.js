"use strict";
/**
 * Title: Write a program using JavaScript on Otp Service
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
exports.verifyOTP = exports.sendOTP = void 0;
// External imports
const otp_generator_1 = __importDefault(require("otp-generator"));
// Internal imports
const otp_model_1 = __importDefault(require("../models/otp.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
// Function to send OTP
const sendOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email: req.body.email });
    if (!user) {
        res.status(404).json({
            acknowledgement: false,
            message: 'Not Found',
            description: 'User not found',
        });
        return;
    }
    const existingUser = yield otp_model_1.default.findOne({ email: user.email });
    if (existingUser) {
        res.status(401).json({
            acknowledgement: true,
            message: 'Unauthorized',
            description: 'User already registered',
        });
        return;
    }
    else {
        const otp = otp_generator_1.default.generate(5, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        });
        const result = yield otp_model_1.default.create({
            name: user.name,
            email: user.email,
            otp,
            status: 'unverified',
        });
        if (!result) {
            res.status(400).json({
                acknowledgement: false,
                message: 'Bad Request',
                description: 'Failed to send OTP',
            });
        }
        else {
            user.otp = result._id;
            yield user.save({
                validateBeforeSave: false,
            });
            res.status(200).json({
                acknowledgement: true,
                message: 'OK',
                description: 'OTP sent successfully',
            });
        }
    }
});
exports.sendOTP = sendOTP;
// Function to verify OTP
const verifyOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const otp = req.params.otp;
    if (!otp) {
        res.status(400).json({
            acknowledgement: false,
            message: 'Bad Request',
            description: 'Provide OTP for verification',
        });
        return;
    }
    const result = yield otp_model_1.default.findOne({ otp });
    if (!result) {
        res.status(404).json({
            acknowledgement: false,
            message: 'Not Found',
            description: 'Please, provide a valid OTP',
        });
        return;
    }
    const user = yield user_model_1.default.findOne({ email: result.email });
    if (result.status === 'unverified') {
        result.status = 'verified';
        yield result.save({
            validateBeforeSave: false,
        });
        if (user) {
            user.status = 'active';
            yield user.save({
                validateBeforeSave: false,
            });
        }
        res.status(200).json({
            acknowledgement: true,
            message: 'OK',
            description: 'Account successfully verified',
        });
    }
    else {
        res.status(400).json({
            acknowledgement: false,
            message: 'Bad Request',
            description: 'Account already verified',
        });
    }
});
exports.verifyOTP = verifyOTP;
