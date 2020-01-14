require("dotenv").config();
const express = require("express");
const routes = require("./api/routes");
const bodyParser = require("body-parser");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.listen(process.env.port || 8080, () => {
    console.log(`Server ready. Listening at http://localhost:8080`);
  });
}

app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/users", routes.userRoutes);
app.use("/repos", routes.repoRoutes);

module.exports = app;
