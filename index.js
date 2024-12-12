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

// Middleware para analizar los datos entrantes
index.use(express.json());
index.use(bodyParser.urlencoded({ extended: false }));

// Endpoint para el webhook
 index.post('/webhook', async (req, res) => {
        const responsewsp = req.body
        console.log(responsewsp);

     if(responsewsp.Body === 'hola' || responsewsp.Body === 'Hola' ){
            try {
                const response = await client.messages.create({
                    contentSid: "HX2346a7d111c0e6f1870e533d427d0a45",
                    from: "whatsapp:+14155238886",
                    to: "whatsapp:+593995068650",
                });
            } catch (error) {
                console.error(`Failed to send message: ${error}`);
            }
        } else {
                try {
                    const response = await client.messages.create({
                        contentSid: "HX788423ed6cdfde27519433fb5b2f66c7",
                        from: "whatsapp:+14155238886",
                        to: "whatsapp:+593995068650",
                    });
                } catch (error) {
                    console.error(`Failed to send message: ${error}`);
                }

            if(responsewsp.Body === 'si' || responsewsp.Body === 'Si' || responsewsp.Body === 'SI' ){
                try {
                    const response = await client.messages.create({
                        contentSid: "HX30a6482340d10cc76ce2c0f108cb230f",
                        from: "whatsapp:+14155238886",
                        to: "whatsapp:+593995068650",
                    });
                    return res.status(200).json(`${req.body}`)
                } catch (error) {
                    console.error(`Failed to send message: ${error}`);
                }
            }
        }




});

  index.get('/recived', (req, res) => {
      const twiml = new MessagingResponse();

      twiml.message('The Robots are coming! Head for the hills!');

      res.type('text/xml').send(twiml.toString());
  });
// Inicia el servidor
index.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});