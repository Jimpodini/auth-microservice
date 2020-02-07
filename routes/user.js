const express = require('express');
const router = express.Router();
const brcypt = require('bcrypt');
const { validate } = require('../models/user');

router.post('/', (req, res) => {
    const { error } = validate(req.body);
    if (error) { return res.status(400).send(error.details[0].message) }

    const saltRounds = 10;
    brcypt.hash(req.body.password, saltRounds, (err, encrypted) => {
        if (err) return res.status(500).send('User could not be saved');
        console.log(encrypted);
    })

    res.send({
        username: req.body.username,
        password: req.body.password
    });
})

module.exports = router;