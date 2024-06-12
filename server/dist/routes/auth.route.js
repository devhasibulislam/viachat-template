"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* external import */
const express_1 = __importDefault(require("express"));
/* internal import */
const auth_controller_1 = require("../controllers/auth.controller");
const verify_middleware_1 = __importDefault(require("../middleware/verify.middleware"));
/* router level connection */
const router = express_1.default.Router();
/* router methods integration */
// account registration
router.post('/register', (req, res, next) => (0, auth_controller_1.accountRegistration)(req, res, next));
// account login
router.post('/login', (req, res, next) => (0, auth_controller_1.accountLogin)(req, res, next));
// password reset
router
    .route('/reset')
    .post((req, res, next) => (0, auth_controller_1.accountReset)(req, res, next))
    .get((req, res, next) => (0, auth_controller_1.verifyAccountReset)(req, res, next))
    .put((req, res, next) => (0, auth_controller_1.confirmAccountReset)(req, res, next));
// login persist
router.get('/me', verify_middleware_1.default, (req, res, next) => {
    if (req.user) {
        (0, auth_controller_1.accountPersist)(req, res, next);
    }
    else {
        // handle the case when the user is not authenticated
        res.status(401).json({
            acknowledgement: false,
            message: 'Unauthorized',
            description: 'Please, login to continue',
        });
    }
});
/* export user router */
exports.default = router;
