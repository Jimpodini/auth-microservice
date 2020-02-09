const mongoose = require('mongoose');
const config = require('config');
const debug = require('debug')('app:db');

module.exports = function dbconnect(){
    mongoose.connect(config.get('db'), { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        debug("connected to MongoDB...")
    })
    .catch(err => {
        console.log('could not connect to MongdoDb, exiting...');
        process.exit(1);
    })
}
