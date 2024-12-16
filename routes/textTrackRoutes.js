const { textTrack } = require('../controllers/textTrackController');
const multer = require('multer');

// Configurar Multer para manejar archivos multimedia
const storage = multer.memoryStorage(); // Almacena archivos en memoria (buffer)
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Tamaño máximo: 10MB
});
module.exports = (app) => {
    app.post('/api/textTrack',upload.single('multimedia'), textTrack );
}