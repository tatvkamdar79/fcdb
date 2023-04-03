const Joi = require("joi");

const validateAdSchema = Joi.object({
  title: Joi.string().alphanum().required(),

  description: Joi.string().alphanum().required(),

  viewState: Joi.boolean(),

  price: Joi.number().integer().min(0).max(10000000).required(),

  title: Joi.string().alphanum().required(),

  category: Joi.string().alphanum().required(),

  shortDescription: Joi.string().alphanum().required(),

  deliveryTime: Joi.number().integer().required(),

  revisions: Joi.number().integer().required(),
});

// console.log(validateAdSchema.validate({price:8000,title:"website",description:"website",category:"website",shortDescription:"website",deliveryTime:5, revisions:9,viewState:true}))
// console.log(validateAdSchema.validate({title:"website",description:"website",category:"website",shortDescription:"website",deliveryTime:5, revisions:9,viewState:true}))
// console.log(validateAdSchema.validate({price:100005,title:"website",description:"website",category:"website",shortDescription:"website",deliveryTime:5, revisions:9,viewState:true}))
// console.log(validateAdSchema.validate({title:"website",description:"website",category:"website",shortDescription:"website",deliveryTime:5, revisions:9,viewState:true}))

module.exports = validateAdSchema;
