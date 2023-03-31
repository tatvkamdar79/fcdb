
const joi = require('joi');
const validateConversationSchema = joi.object({

    adId:joi.required(),

    freelancerId:joi.required(),
    
    clientId:joi.required()

})

console.log(validateConversationSchema.validate({adId:123,freelancerId:123,clientId:234}))

module.exports = validateConversationSchema;