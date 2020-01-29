function log(res, res, next) {
    console.log('logging...');
    next();
}

module.exports = log;