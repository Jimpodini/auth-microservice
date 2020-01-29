const express = require('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const debug = require('debug')('app:startup');
const auth = require('./routes/auth');
const logger = require('./middleware/logger')

console.log(config.get('name'));
console.log(config.get('mail.server'));
console.log(config.get('mail.password'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet());
app.use(logger);
app.use('/api/auth', auth);

if (app.get('env') === 'development') {
    debug("morgan enabled...");
    app.use(morgan('tiny'));
}




const port = process.env.PORT || 3000
app.listen(3000, () => console.log(`listening on port ${port}...`));