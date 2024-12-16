require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');

const server = express();
const PORT = process.env.PORT || 3000;
const templateRoutes = require('./routes/templateRoutes');
const hookRoutes = require('./routes/hookRoutes');
const textTrack = require('./routes/textTrackRoutes');


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
