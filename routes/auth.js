const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

router.post('/login', async (req, res) => {
    const { error } = validate(req.body);
    if (error) { return res.status(400).send(error.details[0].message); }
    
    const user = await User.findOne({ username: req.body.username});

    if (!user) { return res.status(400).send('Username or password does not match'); }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) { return res.status(400).send('Username or password does not match'); }
    
    const token = jwt.sign({ id: user._id }, config.get('jwtPrivateKey'));
    res.send(token);
})

function validate(object) {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    });

    return schema.validate(object);
}

module.exports = router;