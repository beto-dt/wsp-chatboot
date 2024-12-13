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
     const responsewsp = req.body
     console.log(responsewsp);
     const template = await obtenerTemplate(templateName);
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

     // Enviar mensaje con Twilio
     await client.messages.create({
         from: 'whatsapp:+14155238886', // Tu número de WhatsApp Twilio
         to: `whatsapp:+593995068650`,
         body: messageContent,
         persistentAction: buttons.map(
             (btn) => `${btn.type === 'url' ? 'https://' : ''}${btn.url || btn.payload}`
         ),
     });
});
templateRoutes(index);

// Inicia el servidor
index.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
