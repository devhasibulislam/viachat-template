const otpService = require("../services/otp.service");

exports.sendOTP = async (req, res, next) => {
  try {
    await otpService.sendOTP(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log({
      status: res.statusCode,
      method: req.method,
      route: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
    });
  }
};

exports.verifyOTP = async (req, res, next) => {
  try {
    await otpService.verifyOTP(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log({
      status: res.statusCode,
      method: req.method,
      route: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
    });
  }
};
