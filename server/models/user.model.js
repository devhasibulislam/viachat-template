const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
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
      required: [true, "Please, provide your full name"],
    },
    email: {
      type: String,
      required: [true, "Please, provide a valid email address"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please, provide a strong password"],
    },
    role: {
      type: String,
      required: [true, "Please, choose one that suits you"],
      enum: ["admin", "user"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },

    // rest info based on user
    otp: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OTP",
    },
    resetToken: {
      type: String,
      lowercase: true,
      unique: true,
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
  },
  {
    timestamps: true,
  }
);

/* encrypt user password */
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    this.password = this.encryptedPassword(this.password);
  } catch (error) {
    next(error);
  }
});

/* hash user password */
userSchema.methods.encryptedPassword = function (password) {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  return hashedPassword;
};

/* compare user password */
userSchema.methods.comparePassword = function (password, hash) {
  const isValid = bcrypt.compareSync(password, hash);
  return isValid;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
