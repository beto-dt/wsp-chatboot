const {guardarTemplate } = require('../controllers/templateController');

module.exports = (app) => {
    app.post('/api/template',guardarTemplate );
}