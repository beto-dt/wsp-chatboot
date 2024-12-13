require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const { MessagingResponse } = require('twilio').twiml;

// Configura las credenciales de Twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID; // Reemplaza con tu Account SID
const authToken = process.env.TWILIO_AUTH_TOKEN;   // Reemplaza con tu Auth Token
const client = twilio(accountSid, authToken);

const index = express();
const PORT = process.env.PORT || 3000;
const pool = require('./config/config');

// Middleware para analizar los datos entrantes
index.use(express.json());
index.use(bodyParser.urlencoded({ extended: false }));

// Endpoint para el webhook
 index.post('/webhook', async (req, res) => {
        const responsewsp = req.body
        console.log(responsewsp);
         if (responsewsp.Body === 'hola' || responsewsp.Body === 'Hola') {
             try {
                 const response = await client.messages.create({
                     contentSid: "HX2346a7d111c0e6f1870e533d427d0a45",
                     from: "whatsapp:+14155238886",
                     to: "whatsapp:+593995068650",
                 });
             } catch (error) {
                 console.error(`Failed to send message: ${error}`);
             }
         }

       if (responsewsp.Body === 'muchas gracias' || responsewsp.Body === 'Muchas Gracias'){
             try {
                 const response = await client.messages.create({
                     contentSid: "HX788423ed6cdfde27519433fb5b2f66c7",
                     from: "whatsapp:+14155238886",
                     to: "whatsapp:+593995068650",
                 });
             } catch (error) {
                 console.error(`Failed to send message: ${error}`);
             }
         }

     if (responsewsp.Body === 'si' || responsewsp.Body === 'Si') {
         try {
             const response = await client.messages.create({
                 contentSid: "HX59d3de8a1ab212deb0084ae4137b7eb5",
                 from: "whatsapp:+14155238886",
                 to: "whatsapp:+593995068650",
             });
         } catch (error) {
             console.error(`Failed to send message: ${error}`);
         }
     } else if ( responsewsp.Body === 'no' || responsewsp.Body === 'No'){
         try {
             const response = await client.messages.create({
                 contentSid: "HXd99296097dcbef10ba67e0a5d2c43899",
                 from: "whatsapp:+14155238886",
                 to: "whatsapp:+593995068650",
             });
         } catch (error) {
             console.error(`Failed to send message: ${error}`);
         }
     }
});
// Inicia el servidor
index.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});