const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model('User', userSchema);

function validateUser(user){
    const schema = Joi.object({
        username: Joi.string().min(5).required(),
        password: Joi.string().min(5).required()
    });

    return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validateUser;