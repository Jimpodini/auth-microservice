const express = require('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');

console.log(config.get('name'));
console.log(config.get('mail.server'));
console.log(config.get('mail.password'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet());

if (app.get('env') === 'development') {
    console.log("morgan enabled...");
    app.use(morgan('tiny'));
}

app.get('/', (req, res) => {
    res.send("Hello world");
})

app.listen(3000);