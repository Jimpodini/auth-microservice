const config = require('config');

module.exports = function() {
    try {
        config.get('jwtPrivateKey');
    }
    catch(ex) {
        console.log('fotidyllen-private-key is not defined. Exiting process..');
        process.exit(1);
    }
}