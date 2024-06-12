"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* external imports */
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv.config();
/* internal import */
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const otp_route_1 = __importDefault(require("./routes/otp.route"));
/* application level connection */
let app = (0, express_1.default)();
/* middleware connections */
app.use((0, cors_1.default)({
    origin: process.env.ORIGIN_URL,
    methods: 'GET, PUT, POST, DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
}));
app.use(express_1.default.json());
/* router level connections */
app.use('/api/auth', auth_route_1.default);
app.use('/api/otp', otp_route_1.default);
/* global error handler */
app.use(error_middleware_1.default);
/* connection establishment */
app.get('/', (req, res, next) => {
    try {
        res.status(200).json({
            acknowledgement: true,
            message: 'OK',
            description: 'The request is OK',
        });
    }
    catch (err) {
        next(err);
    }
    finally {
        console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
    }
});
/* export app */
exports.default = app;
