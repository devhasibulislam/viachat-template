/* external import */
const express = require("express");

/* internal import */
const otpController = require("../controllers/otp.controller");

/* router level connection */
const router = express.Router();

/* router methods integration */
// send otp
router.post("/send", otpController.sendOTP);

// verify otp
router.put("/verify", otpController.verifyOTP);

/* export user router */
module.exports = router;
