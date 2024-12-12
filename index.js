require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

// Configura las credenciales de Twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID; // Reemplaza con tu Account SID
const authToken = process.env.TWILIO_AUTH_TOKEN;   // Reemplaza con tu Auth Token
const client = twilio(accountSid, authToken);

const index = express();
const PORT = process.env.PORT || 3000;

// Middleware para analizar los datos entrantes
index.use(bodyParser.urlencoded({ extended: false }));

// Endpoint para el webhook
 index.post('/webhook', async (req, res) => {
        try {
            const response = await client.messages.create({
                contentSid: "HX2346a7d111c0e6f1870e533d427d0a45",
                from: "whatsapp:+14155238886",
                to: "whatsapp:+593995068650",
            });
            return res.status(200).json({`Message sent:  ${response.sid}`})
        } catch (error) {
            console.error(`Failed to send message: ${error}`);
        }
});

// Inicia el servidor
index.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});