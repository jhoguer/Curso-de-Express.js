const express = require('express');
const path = require('path');
const bodyParse = require('body-parser');
const productsRouter = require('./routes/views/products');
const productsApiRouter = require('./routes/api/products');

// app
const app = express();

// middlewares
app.use(bodyParse.json());

// Static files
app.use("/static", express.static(path.join(__dirname, "public")));

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");


// routes
app.use('/products', productsRouter);
app.use('/api/products', productsApiRouter )

// redirect
app.get('/', (req, res) => {
  res.redirect('/products');
});


// server
const server = app.listen(8000, () => {
  console.log(`Listening http://localhost:${server.address().port}`);
})