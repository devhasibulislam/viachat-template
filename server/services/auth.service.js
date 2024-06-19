/* external imports */
const crypto = require("crypto");

/* internal imports */
const User = require("../models/user.model");
const token = require("../utils/token.util");
const { sendOTP } = require("./otp.service");
const mailSender = require("../utils/email.util");
const remove = require("../utils/remove.util");

/* account registration */
exports.accountRegistration = async (req, res) => {
  if (!req.body) {
    res.status(400).json({
      acknowledgement: false,
      message: "Bad Request",
      description: "Payload is required",
    });
  } else {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      await remove(req.file.filename);

      res.status(409).json({
        acknowledgement: false,
        message: "Conflict",
        description: "Email already exists",
      });
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
      } else {
        await result.save();
        await sendOTP(req, res);
      }
    }
  }
};

/* account login */
exports.accountLogin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({
      acknowledgement: false,
      message: "Bad Request",
      description: "Email and password are required",
    });
  } else {
    const user = await User.findOne({ email: req.body.email }).populate("otp");

    if (!user) {
      res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "User not found",
      });
    } else {
      const isValid = user.comparePassword(req.body.password, user.password);

      if (!isValid) {
        res.status(401).json({
          acknowledgement: false,
          message: "Unauthorized",
          description: "Invalid password",
        });
      } else {
        if (user.status === "inactive") {
          res.status(401).json({
            acknowledgement: false,
            message: "Unauthorized",
            description: "Your account is not active",
          });
        } else {
          if (user.otp.status === "unverified") {
            res.status(401).json({
              acknowledgement: false,
              message: "Unauthorized",
              description: "Your account is not verified",
            });
          } else {
            const accessToken = token({
              _id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
              status: user.status,
            });

            res.status(200).json({
              acknowledgement: true,
              message: "OK",
              description: "User logged in successfully",
              accessToken,
            });
          }
        }
      }
    }
  }
};

/* password reset */
exports.accountReset = async (req, res) => {
  if (!req.body.email) {
    res.status(400).json({
      acknowledgement: false,
      message: "Bad Request",
      description: "Email is required",
    });
  } else {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "Try with a valid email address",
      });
    } else {
      const resetToken = crypto.randomUUID();
      user.resetToken = resetToken;

      const mailResponse = await mailSender(
        user.email,
        "Reset Your Password",
        `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Reset Your Password</title>
            <style>
              body {
                font-family: Calibri, sans-serif;
                font-style: normal;
              }
              .reset_button {
                background-color: #008080 !important;
                width: fit-content;
                padding: 10px 15px;
                color: white !important;
                border-radius: 5px;
                font-size: 14px;
                text-decoration: none;
                margin: 20px 0;
                display: block;
              }
            </style>
          </head>
          <body>
            <section>
              <p>Hello ${user.name},</p>
              <div style="margin-bottom: 10px">
                <span>
                  We received a request a reset your password. Click the button below to
                  choose a new password:
                </span>
                <br />
                <span>
                  Please, enter the following One-Time-Link (OTL) in the
                  verification field:
                </span>
              </div>
              <a
                href="${req.protocol}://${req.get("host")}${
          req.originalUrl
        }?token=${resetToken}"
                target="_blank"
                class="reset_button"
                >Reset Password</a
              >
              <p>If you didn't as to reset your password, you can ignore this email.</p>
              <p>
                <span>Thanks,</span>
                <br />
                <span style="font-weight: bold">${
                  process.env.APP_NAME
                } Team</span>
              </p>
            </section>
          </body>
        </html>
        `
      );

      if (!mailResponse) {
        res.status(400).json({
          acknowledgement: false,
          message: "Bad Request",
          description: "Failed to send password reset link",
        });
      } else {
        await user.save({
          runValidators: false,
        });

        res.status(200).json({
          acknowledgement: true,
          message: "OK",
          description: "Reset link sent successfully",
        });
      }
    }
  }
};

exports.verifyAccountReset = async (req, res) => {
  if (!req.query.token) {
    res.status(400).json({
      acknowledgement: false,
      message: "Bad Request",
      description: "Token is required",
    });
  }

  const user = await User.findOne({ resetToken: req.query.token });

  if (!user) {
    res.status(404).json({
      acknowledgement: false,
      message: "Not Found",
      description: "Invalid token",
    });
  } else {
    res.redirect(
      `${process.env.ORIGIN_URL}/auth/reset/password?token=${req.query.token}`
    );
  }
};

exports.confirmAccountPersist = async (req, res) => {
  if (!req.query.token) {
    res.status(400).json({
      acknowledgement: false,
      message: "Bad Request",
      description: "Token is required",
    });
  }

  if (!req.body.password) {
    res.status(400).json({
      acknowledgement: false,
      message: "Bad Request",
      description: "Password is required",
    });
  }

  const user = await User.findOne({ resetToken: req.query.token });
  if (!user) {
    res.status(404).json({
      acknowledgement: false,
      message: "Not Found",
      description: "Try with a valid reset token",
    });
  } else {
    const result = await User.findByIdAndUpdate(
      user?._id,
      {
        $set: { password: user.encryptedPassword(req.body.password) },
        $unset: { resetToken: 1 },
      },
      {
        runValidators: true,
        returnOriginal: false,
      }
    );

    if (!result) {
      res.status(400).json({
        acknowledgement: false,
        message: "Bad Request",
        description: "Failed to reset password",
      });
    } else {
      res.status(200).json({
        acknowledgement: true,
        message: "OK",
        description: "Password reset successfully",
      });
    }
  }
};

/* persist login */
exports.accountPersist = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (!user) {
    res.status(404).json({
      acknowledgement: false,
      message: "Not Found",
      description: "Please, login to continue",
    });
  } else {
    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "Please, continue exploring",
      data: user,
    });
  }
};
