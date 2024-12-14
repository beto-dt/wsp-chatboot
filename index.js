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

// Middleware para analizar los datos entrantes
index.use(express.json());
index.use(bodyParser.urlencoded({ extended: false }));

// Endpoint para el webhook
 index.post('/webhook', async (req, res) => {
     const responsewsp = req.body.Body
     console.log(responsewsp);
     const variables = ['Juan'];
     const template = await obtenerTemplate(responsewsp);
     if (!template) {
         console.error('Template no encontrado');
         return;
     }

     // Reemplazar variables en el contenido
     let messageContent = template.content;
     variables.forEach((value, index) => {
         messageContent = messageContent.replace(`{{${index + 1}}}`, value);
     });

     // Crear botones dinámicos
     const buttons = template.buttons.map((button) => {
         if (button.type === 'quick_reply') {
             return { type: 'quick_reply', text: button.label, payload: button.action };
         } else if (button.type === 'url') {
             return { type: 'url', text: button.label, url: button.action };
         }
     });

     console.log(buttons);

     // Enviar mensaje con Twilio
     try {
         const message = await client.messages.create({
             from: 'whatsapp:+14155238886', // Número de WhatsApp Twilio
             to: 'whatsapp:+593995068650', // Número del destinatario
             interactive: {
                 type: 'button',
                 body: {
                     text: 'Selecciona una opción:', // Texto principal
                 },
                 action: {
                     buttons: [
                         {
                             type: 'reply',
                             text: 'Más Información',
                             payload: 'INFO',
                         },
                         {
                             type: 'url',
                             text: 'Ir al Sitio',
                             url: 'https://example.com',
                         },
                     ],
                 },
             },
         });

         console.log('Mensaje enviado con éxito:', message.sid);
     } catch (error) {
         console.error('Error al enviar mensaje:', error.message);
     }
});
templateRoutes(index);

// Inicia el servidor
index.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
