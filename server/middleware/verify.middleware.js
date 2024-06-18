/* external imports */
const jwt = require("jsonwebtoken");

async function verify(req, res, next) {
  try {
    // catch the token from user header
    const token = req.headers?.authorization?.split(" ")[1];

    // no token explicitly give error
    if (!token) {
      return res.status(401).json({
        acknowledgement: false,
        message: "Unauthorized",
        description: "Please, login to continue",
      });
    }

    // fetching token set the user on request
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          acknowledgement: false,
          message: "Unauthorized",
          description: "Please, login to continue",
        });
      } else {
        req.user = decoded;
        next();
      }
    });
  } catch (error) {
    next(error);
  }
}

/* export token verification */
module.exports = verify;
