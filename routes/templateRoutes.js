const {guardarTemplate. obtenerTemplate } = require('../controllers/templateController');

module.exports = (app) => {
    app.post('/api/template',guardarTemplate );
    app.get('/api/template/:name', obtenerTemplate);
}