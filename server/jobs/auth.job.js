// internal imports
const User = require("../models/user.model");
const { sendOTP } = require("../services/otp.service");

const accountRegistration = (agenda) => {
  agenda.define("register-user", async (job, done) => {
    const { req, res } = job.attrs.data;

    if (!req.body) {
      res.status(400).json({
        acknowledgement: false,
        message: "Bad Request",
        description: "Payload is required",
      });
      return done();
    }

    const user = await User.findOne({ email: req.body.email });

    if (user) {
      res.status(409).json({
        acknowledgement: false,
        message: "Conflict",
        description: "Email already exists",
      });
      return done();
    } else {
      const result = new User({
        ...req.body,
        avatar: {
          url: req.file.path,
          id: req.file.filename,
        },
      });

      if (!result) {
        res.status(400).json({
          acknowledgement: false,
          message: "Bad Request",
          description: "Check given info to recreate user",
        });
        return done();
      } else {
        await result.save();
        await sendOTP(req, res);
        res.status(200).json({
          acknowledgement: true,
          message: "User registered successfully",
        });
        return done();
      }
    }
  });
};

module.exports = accountRegistration;
