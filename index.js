const express = require('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const debug = require('debug')('app:startup');
const registerRoutes = require('./startup/routes');
const logger = require('./middleware/logger');
const dbconnect = require('./startup/db');

dbconnect();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet());
app.use(logger);

if (app.get('env') === 'development') {
    debug("morgan enabled...");
    app.use(morgan('tiny'));
}

registerRoutes(app);

const port = process.env.PORT || 3000
app.listen(3000, () => debug(`listening on port ${port}...`));