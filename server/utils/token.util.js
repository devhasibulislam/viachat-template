/* external import */
const jwt = require("jsonwebtoken");

function token(user) {
  // grab specific user info to generate jwt token
  const accessToken = jwt.sign(user, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRY,
  });

  return accessToken;
}

/* export token utility */
module.exports = token;
