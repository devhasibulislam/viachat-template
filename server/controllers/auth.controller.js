/* internal imports */
const userService = require("../services/auth.service");
const remove = require("../utils/remove.util");

/* account registration */
exports.accountRegistration = async (req, res, next) => {
  try {
    await userService.accountRegistration(req, res);
  } catch (error) {
    await remove(req.file.filename);

    next(error);
  } finally {
    console.log({
      status: res.statusCode,
      method: req.method,
      route: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
    });
  }
};

/* account login */
exports.accountLogin = async (req, res, next) => {
  try {
    await userService.accountLogin(req, res);
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

/* password reset */
exports.accountReset = async (req, res, next) => {
  try {
    await userService.accountReset(req, res);
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

exports.verifyAccountReset = async (req, res, next) => {
  try {
    await userService.verifyAccountReset(req, res);
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

exports.confirmAccountPersist = async (req, res, next) => {
  try {
    await userService.confirmAccountPersist(req, res);
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

/* persist login */
exports.accountPersist = async (req, res, next) => {
  try {
    await userService.accountPersist(req, res);
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
