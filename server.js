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


// Endpoint que recibe exclusivamente `form-data` con multimedia
server.post('/upload', upload.single('multimedia'), async (req, res) => {
    try {
        // Verificar si se ha recibido un archivo
        if (!req.file) {
            return res.status(400).json({ error: 'No se recibió ningún archivo' });
        }

        // Crear un objeto FormData
        const formData = new FormData();
        formData.append('multimedia', req.file.buffer, req.file.originalname); // Buffer como archivo
        // Configurar los encabezados (incluyen los de form-data)
        const headers = {
            ...formData.getHeaders(), // Encabezados generados por FormData
        };

        // Enviar la imagen al endpoint externo
        const externalEndpoint = 'https://general.qa-advantagemkt.mx/demo-textract/bachoco-core/app/validaTextract'; // Cambia por tu URL externa
        const response = await axios.post(externalEndpoint, formData, { headers });

        console.log('Respuesta del endpoint externo:', response.data);

        // Responder al cliente que subió la imagen
        res.status(200).json({
            message: 'Imagen procesada y enviada al endpoint externo',
            externalResponse: response.data.externalResponse,
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
