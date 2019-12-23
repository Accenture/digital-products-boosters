require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./api/routes');
const db = require('./models').db;
const bodyParser = require('body-parser');

db.sync({ force: true }).then(() => {
  app.listen(process.env.port || 8080, () => {
    console.log(`Server ready. Listening at http://localhost:8080`);
  });
});
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/users', routes.userRoutes);
app.use('/repos', routes.repoRoutes);
