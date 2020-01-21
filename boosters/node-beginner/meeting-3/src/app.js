//IGNORE FILE FOR BOOSTER
const app = require("./server");
app.listen(process.env.port || 8080, () => {
  console.log(`Server ready. Listening at http://localhost:8080`);
});
