const Joi = require('joi');

const validateClientSchema = Joi.object({

    name: Joi.string()
        .alphanum()
        .required(),
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
    
})

console.log(validateClientSchema.validate({name:"hrithik" , email:""}))
console.log(validateClientSchema.validate({name:"hrithik" , email:"hrithikjain19@gmail.in"}))


module.exports = validateClientSchema;