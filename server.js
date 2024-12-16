require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const server = express();
const PORT = process.env.PORT || 3000;
const templateRoutes = require('./routes/templateRoutes');
const hookRoutes = require('./routes/hookRoutes');
const textTrack = require('./routes/textTrackRoutes');

// Configurar Multer para manejar archivos multimedia
const storage = multer.memoryStorage(); // Almacena archivos en memoria (buffer)
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Tamaño máximo: 10MB
});

// Middleware para analizar los datos entrantes
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: false }));


// Endpoint que recibe exclusivamente `form-data` con multimedia
server.post('/upload', upload.single('multimedia'), (req, res) => {
    try {
        // Verificar si se ha recibido un archivo
        if (!req.file) {
            return res.status(400).json({ error: 'No se recibió ningún archivo' });
        }

        // Datos del archivo recibido
        console.log('Archivo recibido:', req.file);

        // Campos adicionales del `form-data`
        console.log('Datos adicionales:', req.body);

        res.status(200).json({
            message: 'Archivo recibido correctamente',
            file: {
                originalname: req.file.originalname,
                mimetype: req.file.mimetype,
                size: req.file.size,
            },
            additionalFields: req.body,
        });
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
});

hookRoutes(server);
templateRoutes(server);
textTrack(server);

// Inicia el servidor
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
