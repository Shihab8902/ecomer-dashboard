require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(process.env.DB_URL, { dbName: "EcommerDB" });
    console.log("Connection equipped with database successfully!");
}


module.exports = connectDB;