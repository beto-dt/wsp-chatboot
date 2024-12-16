const twilio = require('twilio');
const { obtenerTemplate } = require('../controllers/templateController');

// Configura las credenciales de Twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID; // Reemplaza con tu Account SID
const authToken = process.env.TWILIO_AUTH_TOKEN;   // Reemplaza con tu Auth Token
const client = twilio(accountSid, authToken);

const hook =  async (req, res) => {
    const responsewsp = req.body.Body
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

    // Enviar mensaje con Twilio
    try {
        const message = await client.messages.create({
            from: 'whatsapp:+14155238886', // Número de WhatsApp Twilio
            to: 'whatsapp:+593995068650',
            body: messageContent
        });

        return res.status(200).json({
            status: 'success',
            message: `Mensaje enviado con éxito: ${message.sid}`,
        })
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: `Error al enviar mensaje:: ${error.message}`,
        })
    }
}

module.exports = {
    hook
}