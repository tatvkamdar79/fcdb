const joi = require('joi');

const validateFreelancerSchema = joi.object({
    name:joi.string().required(),
    email:joi.string().email().required(),

})

console.log(validateFreelancerSchema.validate({email:"dsdsds"}))
console.log(validateFreelancerSchema.validate({name:"hrithik",email:"dsdsds@gmail.com"}))



module.exports = validateFreelancerSchema;