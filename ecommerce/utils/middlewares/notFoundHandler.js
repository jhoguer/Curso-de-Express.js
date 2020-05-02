const Boom = require('@hapi/boom');
const isRequestAjaxOrApi = require('../isRequestAjaxOrApi');

const notFoundHandler = (req, res) => {
  if (isRequestAjaxOrApi(req)) {
    
    const {
      output: { statusCode, payload }
    } = Boom.notFound();
  
    res.status(statusCode).json(payload);
  }
  res.status(404).render("404");
}

module.exports = notFoundHandler;