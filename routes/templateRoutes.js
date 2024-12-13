const templateController = require('../controllers/templateController');

module.exports = (app) => {
    app.post('/api/template',templateController.guardarTemplate );
    app.get('/api/template/:name', templateController.obtenerTemplate);
}