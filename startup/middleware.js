const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('../middleware/logger');
const debug = require('debug')('app:startup');

module.exports = function (app) {
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(express.static('public'));
    app.use(helmet());
    app.use(logger);

    if (app.get('env') === 'development') {
        debug("morgan enabled...");
        app.use(morgan('tiny'));
    }
}