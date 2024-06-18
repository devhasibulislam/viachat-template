/* external import */
const express = require("express");
var bodyParser = require("body-parser");

/* internal import */
const userController = require("../controllers/auth.controller");
const verify = require("../middleware/verify.middleware");
const upload = require("../middleware/upload.middleware");
const { checkPayload, checkUser } = require("../middleware/check.middleware");

/* router level connection */
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

/* router methods integration */
// account registration
router.post(
  "/register",
  checkPayload,
  checkUser,
  upload.single("avatar"),
  userController.accountRegistration
);
// account login
router.post("/login", userController.accountLogin);
// password reset
router
  .route("/reset")
  .post(userController.accountReset)
  .get(userController.verifyAccountReset)
  .put(userController.confirmAccountPersist);
// login persist
router.get("/me", verify, userController.accountPersist);

/* export user router */
module.exports = router;
