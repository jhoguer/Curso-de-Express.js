// const { config } = require('../../config');

// const logErrors = (err, req, res, next) => {
//   console.log(err.stack);
//   next(err);
// }

// const clientErrorHandler = (err, req, res, next) => {
//   if (req.xhr) {
//     res.status(500).json({ err: err.message });
//   } else {
//     next(err);
//   }
// }

// const errorHandler = (err, req, res, next) => {
//   //  catch error while streaming
//   if (res.headersSent) {
//     next(err);
//   }

//   if (!config.dev) {
//     delete err.stack;
//   }

//   res.status(err.status || 500);
//   res.render("error", { error: err })
// }

// module.exports = {
//   logErrors,
//   clientErrorHandler,
//   errorHandler
// }

const boom = require('@hapi/boom');
const { config } = require('../../config');
const isRequestAjaxOrApi = require('../../utils/isRequestAjaxOrApi');

function withErrorStack(error, stack) {
  if (config.dev) {
    return { ...error, stack };
  }

  return error;
}

function logErrors(err, req, res, next) {
  console.log(err);
  next(err);
}

function wrapErrors(err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }

  next(err);
}

const clientErrorHandler = (err, req, res, next) => {
  const {
    output: { statusCode, payload }
  } = err;
  if (isRequestAjaxOrApi(req) || res.headersSent) {
    res.status(statusCode).json(withErrorStack(payload, err.stack));
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) { // eslint-disable-line
  const {
    output: { statusCode, payload }
  } = err;
  res.status(statusCode);
  res.json(withErrorStack(payload, err.stack));
}

module.exports = {
  logErrors,
  wrapErrors,
  errorHandler,
  clientErrorHandler
};
