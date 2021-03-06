const express = require('express');
const path = require('path');
const bodyParse = require('body-parser');
const productsRouter = require('./routes/views/products');
const productsApiRouter = require('./routes/api/products');
const authApiRouter = require('./routes/api/auth');

const {
  logErrors, 
  wrapErrors, 
  errorHandler,
  clientErrorHandler
} = require('./utils/middlewares/errorsHandler');

const notFoundHandler = require('./utils/middlewares/notFoundHandler');

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
productsRouter(app);
app.use('/api/auth', authApiRouter);

// redirect
app.get('/', (req, res) => {
  res.redirect('/products');
});

// error 404
app.use(notFoundHandler);

// error handlers
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);
app.use(clientErrorHandler);

// server
const server = app.listen(8000, () => {
  console.log(`Listening http://localhost:${server.address().port}`);
})