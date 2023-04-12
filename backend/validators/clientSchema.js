const Joi = require("joi");

const validateClientSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "in"] } })
    .required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string(),
});

module.exports = validateClientSchema;
