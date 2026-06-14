const mongoose = require("mongoose");
require("dotenv").config();
const dns = require("node:dns/promises");

const dbConnect = async () => {
  try {
    dns.setServers(["8.8.8.8", "1.1.1.1"]);

    await mongoose.connect(process.env.DATABASE_URI);
    console.log(`DB connected sucessfully`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = dbConnect;
