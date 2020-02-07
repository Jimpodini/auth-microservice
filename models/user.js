const Joi = require('@hapi/joi');

function validateUser(user){
    const schema = Joi.object({
        username: Joi.string().min(5).required(),
        password: Joi.string().min(5).required()
    });

    return schema.validate(user);
}

module.exports.validate = validateUser;