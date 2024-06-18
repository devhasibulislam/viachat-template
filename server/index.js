/* external imports */
require("dotenv").config();

/* internal imports */
const app = require("./app");
const agenda = require("./config/agenda");
const connectDB = require("./utils/database.util");

/* application port */
const port = process.env.PORT || 5173;

/* database connection */
connectDB();

/* establish server port */
app.listen(port, () => {
  console.info(`Server is running on port ${port}`);
});

agenda.on("ready", () => {
  agenda.start();
  console.log("Agenda started successfully");
});
