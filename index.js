require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const { MessagingResponse } = require('twilio').twiml;
const { obtenerTemplate } = require('./controllers/templateController');

// Configura las credenciales de Twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID; // Reemplaza con tu Account SID
const authToken = process.env.TWILIO_AUTH_TOKEN;   // Reemplaza con tu Auth Token
const client = twilio(accountSid, authToken);

const index = express();
const PORT = process.env.PORT || 3000;
const templateRoutes = require('./routes/templateRoutes');
const hookRoutes = require('./routes/hookRoutes');

// Middleware para analizar los datos entrantes
index.use(express.json());
index.use(bodyParser.urlencoded({ extended: false }));

// Endpoint para el webhook
 index.post('/webhook', async (req, res) => {

});
hookRoutes(index);
templateRoutes(index);

// Inicia el servidor
index.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
