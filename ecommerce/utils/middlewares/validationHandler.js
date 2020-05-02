const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');

const validate = (data, schema) => {
  console.log('***************************', data)
  console.log('+++++++++++++++++++++++++++', schema)
  const { error } = schema.validate(data)
  return error;
}

const validationHandler = (schema, check = "body") => {
  return (req, res, next) => {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<', req[check])
    const error = validate(req[check], schema);
    error ? next(Boom.badRequest(error)) : next();
  };
}


module.exports = validationHandler;