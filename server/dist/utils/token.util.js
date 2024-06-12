"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* external import */
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function token({ _id, name, email, role, status }) {
    // grab specific user info to generate jwt token
    const accessToken = jsonwebtoken_1.default.sign({
        _id,
        name,
        email,
        role,
        status,
    }, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRES });
    return accessToken;
}
/* export token utility */
exports.default = token;
