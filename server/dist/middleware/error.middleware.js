"use strict";
/**
 * Title: Write a program using JavaScript on Error Middleware
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
 * Date: 03, December 2023
 */
Object.defineProperty(exports, "__esModule", { value: true });
function error(err, _, res, __) {
    res.send({
        acknowledgement: false,
        message: err.name,
        description: err.message,
    });
}
exports.default = error;
