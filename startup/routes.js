const auth = require('../routes/auth');
const user = require('../routes/user');

module.exports = function registerRoutes(app) {
    app.use('/api/auth', auth);
    app.use('/api/user', user);
}