/* external imports */
const express = require("express");
const cors = require("cors");
require("dotenv").config();

/* internal import */
const error = require("./middleware/error.middleware");
const authRouter = require("./routes/auth.route");
const otpRouter = require("./routes/otp.route");

/* application level connection */
const app = express();

/* middleware connections */
app.use(
  cors({
    origin: process.env.ORIGIN_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* router level connections */
app.use("/api/auth", authRouter);
app.use("/api/otp", otpRouter);

/* global error handler */
app.use(error);

/* connection establishment */
app.get("/", (req, res, next) => {
  try {
    console.log({
      status: res.statusCode,
      acknowledgement: true,
      message: "OK",
      description: "The request is OK",
      version: "1.0.0",
      date: new Date(),
      author: "Hasibul Islam",
      urls: {
        client: process.env.ORIGIN_URL,
        server: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
        repository: "https://github.com/devhasibulislam/viachat-template",
      },
    });

    res.redirect("https://devhasibulislam.vercel.app/");
  } catch (err) {
    next(err);
  } finally {
    console.log({
      status: res.statusCode,
      method: req.method,
      route: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
    });
  }
});

/* export application */
module.exports = app;
