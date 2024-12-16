require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const FormData = require('form-data');
const server = express();
const axios = require('axios');
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

hookRoutes(server);
templateRoutes(server);
textTrack(server);

// Inicia el servidor
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
