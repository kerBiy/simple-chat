const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouts = require("./routes/userRoutes");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to the DataBase");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/auth", userRouts);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started at port: ${process.env.PORT}`);
});
