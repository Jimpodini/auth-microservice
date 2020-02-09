const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User, validate } = require('../models/user');
const _ = require('lodash');

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) { return res.status(400).send(error.details[0].message) }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const user = new User({
        username: req.body.username,
        password: hashedPassword
    });

    user.save()
        .catch(err => {
            return res.status(500).send("Could not save user to the database...");
        })

    res.send(_.pick(req.body, ['username']));
})

module.exports = router;