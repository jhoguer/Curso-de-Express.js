const Joi = require('@hapi/joi');

const productIdSchema = Joi.object({productId: Joi.string().regex(/^[0-9a-fA-F]{24}$/)});
const productTagSchema = Joi.array().items(Joi.string().max(10));

const createProductSchema = Joi.object({
  name: Joi.string().max(50).required(),
  price: Joi.number().min(1).max(1000000),
  image: Joi.string().required(),
  tags: productTagSchema
});

const updateProductSchema = Joi.object({
  name: Joi.string().max(50),
  price: Joi.number()
    .min(1)
    .max(1000000),
  image: Joi.string(),
  tags: productTagSchema
});

// const schema = Joi.object({
//   username: Joi.string()
//       .alphanum()
//       .min(3)
//       .max(30)
//       .required(),

//   password: Joi.string()
//       .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

//   repeat_password: Joi.ref('password'),

//   access_token: [
//       Joi.string(),
//       Joi.number()
//   ],

//   birth_year: Joi.number()
//       .integer()
//       .min(1900)
//       .max(2013),

//   email: Joi.string()
//       .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
// })

module.exports = {
  productIdSchema,
  productTagSchema,
  createProductSchema,
  updateProductSchema
};