const twilio = require('twilio');
const { obtenerTemplate } = require('../controllers/templateController');
const { textTrack } = require('../controllers/textTrackController');


// Configura las credenciales de Twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID; // Reemplaza con tu Account SID
const authToken = process.env.TWILIO_AUTH_TOKEN;   // Reemplaza con tu Auth Token
const client = twilio(accountSid, authToken);

const hook =  async (req, res) => {
    const responsewsp = req.body;
    console.log(responsewsp);
    const variables = ['Juan'];
    const template = await obtenerTemplate('test');
    if (!template) {
        console.error('Template no encontrado');
        return;
    }

    if(responsewsp.MessageType === 'image'){
            console.log(responsewsp.MediaUrl0);
        return textTrack(responsewsp.MediaUrl0);
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

    const message = await client.messages.create({
        contentSid: "HXcd75ecabd2ce7e8eae9fada1630fa685",
        contentVariables: JSON.stringify({ 1: "Name" }),
        from: "whatsapp:+5215553512599",
        to: "whatsapp:+593995068650",
    }).then((message) => console.log('Mensaje enviado con SID:', message.sid))
        .catch((error) => console.error('Error al enviar el mensaje:', error));

    // Enviar mensaje con Twilio
    /*try {
        const message = await client.messages.create({
            from: 'whatsapp:+5215553512599',
            to: 'whatsapp:+593995068650',
            interactive: {
                type: 'button',
                body: {
                    text: 'Selecciona una opción:',
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
        console.log(message);

        return res.status(200).json({
            status: 'success',
            message: `Mensaje enviado con éxito: ${message.sid}`,
        })
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: `Error al enviar mensaje:: ${error.message}`,
        })
    }*/
}

module.exports = {
    hook
}