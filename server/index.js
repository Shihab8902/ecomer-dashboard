require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT;
const cors = require("cors");
const routes = require("./routes/router");
const connectDB = require("./db/connectDB");
const storeCollection = require("./model/storeModel");
const orderCollection = require("./model/orderModel");



//Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use(routes);



//Listen to the server and database connection
const run = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`The server is running at http://localhost:${PORT}`);
    });


}

run();
