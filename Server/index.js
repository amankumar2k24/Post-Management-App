const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

// Intialize the Express app
const app = express();

//Configuring Middlewares
app.use(bodyParser.json({ extended: true, limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json({ extended: true, limit: "5mb" }));

// Defining PORT to connect Database
const PORT = process.env.PORT || 3000;

app.use("/uploads", express.static("uploads"));

app.use("/api/v1/", require("./routes"));

// Connecting to Database
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then((res) => {
    app.listen(PORT, function () {
      console.log("Connecting to Database");
      console.log(`Server is running on PORT ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
