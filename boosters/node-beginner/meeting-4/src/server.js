const express = require("express");
const routes = require("./api/routes");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/users", routes.userRoutes);
app.use("/repos", routes.repoRoutes);

module.exports = app;
