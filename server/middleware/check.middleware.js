// internal imports
const User = require("../models/user.model");

const checkPayload = (req, res, next) => {
    console.log(req.body, "REQUEST_BODY_01");

  if (!req.body) {
    return res.status(400).json({
      acknowledgement: false,
      message: "Bad Request",
      description: "Payload is required",
    });
  } else {
    next();
  }
};

const checkUser = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    return res.status(409).json({
      acknowledgement: false,
      message: "Conflict",
      description: "User already exists",
    });
  } else {
    next();
  }
};

// export multiple middlewares
module.exports = { checkPayload, checkUser };
