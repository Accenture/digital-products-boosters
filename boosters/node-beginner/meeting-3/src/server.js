require("dotenv").config();
const express = require("express");
const routes = require("./api/routes");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
