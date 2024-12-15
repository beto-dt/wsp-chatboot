const { hook } = require('../controllers/hookController');

module.exports = (app) => {
    app.post('/hook',hook );
}