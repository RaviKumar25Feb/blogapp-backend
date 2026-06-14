const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
    try{
        await mongoose.connect(process.env.DATABASE_URI);
        console.log(`DB connected sucessfully`);
    } catch(error) {
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = dbConnect;