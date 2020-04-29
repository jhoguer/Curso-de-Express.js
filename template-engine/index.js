const express = require('express');
const expressJsx = require('./express-jsx');
const app = express();

app.engine("jsx", expressJsx);
app.set("views", "./views");
app.set("view engine", "jsx");

app.get('/', (req, res) => {
  res.render("index", { hello: 'hola', world: 'mundo'});
});

const server = app.listen(8000, () => {
  console.log(`listening http://localhost:${server.address().port}`);
});