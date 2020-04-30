const express = require('express');
const path = require('path');
const router = require('./routes/products');

const app = express();




app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");


app.use('/products', router);



const server = app.listen(8000, () => {
  console.log(`Listening http://localhost:${server.address().port}`);
})