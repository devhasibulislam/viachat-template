const Agenda = require("agenda");
require("dotenv").config();
const accountRegistration = require("../jobs/auth.job");

const agenda = new Agenda({
  db: { address: process.env.ATLAS_URI, collection: "users" },
});

accountRegistration(agenda);

module.exports = agenda;
