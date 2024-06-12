"use strict";
/**
 * Title: Write a program using JavaScript on User Model
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
const mongoose_1 = __importStar(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Create a Schema corresponding to the document interface.
const userSchema = new mongoose_1.Schema({
    // user information
    // avatar: {
    //   url: {
    //     type: String,
    //     required: [true, 'Please, provide a valid avatar URL'],
    //   },
    //   public_id: {
    //     type: String,
    //     required: [true, 'Please, provide the avatar public id'],
    //   },
    // },
    name: {
        type: String,
        required: [true, 'Please, provide your full name'],
    },
    email: {
        type: String,
        required: [true, 'Please, provide a valid email address'],
        unique: true, // Change this to boolean
    },
    password: {
        type: String,
        required: [true, 'Please, provide a strong password'],
    },
    role: {
        type: String,
        required: [true, 'Please, choose one that suits you'],
        enum: ['admin', 'user'],
        default: 'user',
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
    // rest info based on user
    otp: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'OTP',
    },
    resetToken: {
        type: String,
        lowercase: true,
        unique: true, // Change this to boolean
    },
    // user account timing
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});
/* encrypt user password */
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password')) {
            return next();
        }
        try {
            this.password = this.encryptedPassword(this.password);
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
/* hash user password */
userSchema.methods.encryptedPassword = function (password) {
    const salt = bcryptjs_1.default.genSaltSync(10);
    const hashedPassword = bcryptjs_1.default.hashSync(password, salt);
    return hashedPassword;
};
/* compare user password */
userSchema.methods.comparePassword = function (password, hash) {
    return bcryptjs_1.default.compareSync(password, hash);
};
// Create a Model.
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
