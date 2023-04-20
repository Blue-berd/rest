/** @format */

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const routes = require("./routes");

app.get("/", async (req, res) => {
  res.status(200).send("hello world");
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

app.listen(3000, () => {
  console.log("connected to express port 3000");
});

mongoose
  .connect(
    "mongodb://localhost:27017"
  )
  .then(() => console.log("connected to mongodb"))
  .catch((err) => {
    console.log(err.message);
  });
