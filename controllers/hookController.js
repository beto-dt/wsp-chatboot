const twilio = require('twilio');
const { obtenerTemplate } = require('../controllers/templateController');
const { textTrack } = require('../controllers/textTrackController');


// Configura las credenciales de Twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID; // Reemplaza con tu Account SID
const authToken = process.env.TWILIO_AUTH_TOKEN;
const numFrom = process.env.NUMEROFROM;
// Reemplaza con tu Auth Token
const client = twilio(accountSid, authToken);
const conversationSteps = {};

const hook =  async (req, res) => {
    const { From, Body, from } = req.body; // Número del usuario y mensaje
    const userMessage = Body.toLowerCase();
    console.log(userMessage);

    // Inicializa el estado de conversación si no existe
    if (!conversationSteps[From]) {
        conversationSteps[From] = 1; // Paso inicial
    }


    let responseMessage = "";

    try {
        switch (conversationSteps[From]) {
            case 1:
                responseMessage = "¡Hola! Gracias por ser parte de la promoción Con Nestlé , ganar sabe bien en Walmart Supercenter y/o Bodega Aurrera. Deseas Participar";
                 await client.messages.create({
                    from: numFrom,
                    to: From,
                    body: responseMessage
                }).then((message) => console.log('Mensaje enviado con SID:', message.sid))
                    .catch((error) => console.error('Error al enviar el mensaje:', error));
                conversationSteps[From]++;
                break;

            case 2:
                await client.messages.create({
                    contentSid: "HXcd75ecabd2ce7e8eae9fada1630fa685",
                    contentVariables: JSON.stringify({ 1: "Name" }),
                    from: numFrom,
                    to: From,
                }).then((message) => console.log('Mensaje enviado con SID:', message.sid))
                    .catch((error) => console.error('Error al enviar el mensaje:', error));
                    conversationSteps[From]++;

                break;

            case 3:
                if (userMessage.includes("SI") || userMessage.includes("si") || userMessage.includes("Sí")) {
                    responseMessage = "¿Te gustaría recibir noticias y novedades de Nestlé y sus marcas?";
                    await client.messages.create({
                        from: numFrom,
                        to: From,
                        body: responseMessage
                    }).then((message) => console.log('Mensaje enviado con SID:', message.sid))
                        .catch((error) => console.error('Error al enviar el mensaje:', error));
                    conversationSteps[From]++;
                } else {
                    responseMessage = " Lo sentimos, para continuar debes aceptar los Términos y Condiciones y Aviso de Privacidad.¡Presiona para aceptar!";
                    await client.messages.create({
                        from: numFrom,
                        to: From,
                        body: responseMessage
                    }).then((message) => console.log('Mensaje enviado con SID:', message.sid))
                        .catch((error) => console.error('Error al enviar el mensaje:', error));
                }
                break;

            case 4:
                if (userMessage.includes("SI") || userMessage.includes("si") || userMessage.includes("Sí")) {
                    responseMessage = " ¡Ganar es muy fácil! Regístrate y comienza a acumular tus compras. Te solicitaré datos por única vez.Por favor compártenos: Tu nombre completo (por ejemplo, Juan Pérez).";
                    await client.messages.create({
                        from: numFrom,
                        to: From,
                        body: responseMessage
                    }).then((message) => console.log('Mensaje enviado con SID:', message.sid))
                        .catch((error) => console.error('Error al enviar el mensaje:', error));
                    conversationSteps[From]++;
                } else {
                    responseMessage = "¿Hay algo más con lo que pueda ayudarte?";
                    await client.messages.create({
                        from: numFrom,
                        to: From,
                        body: responseMessage
                    }).then((message) => console.log('Mensaje enviado con SID:', message.sid))
                        .catch((error) => console.error('Error al enviar el mensaje:', error));
                }
                break;

            case 5:
                responseMessage = "¡Gracias a ti! Que tengas un excelente día. 👋";
                await client.messages.create({
                    from: numFrom,
                    to: From,
                    body: responseMessage
                }).then((message) => console.log('Mensaje enviado con SID:', message.sid))
                    .catch((error) => console.error('Error al enviar el mensaje:', error));
                delete conversationSteps[From]; // Finaliza la conversación
                break;

            default:
                responseMessage = "Lo siento, no entendí tu solicitud. ¿Puedes reformularlo?";
                await client.messages.create({
                    from: numFrom,
                    to: From,
                    body: responseMessage
                }).then((message) => console.log('Mensaje enviado con SID:', message.sid))
                    .catch((error) => console.error('Error al enviar el mensaje:', error));
                break;
        }

    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).send("Error interno del servidor");
    }
    /*const variables = ['Juan'];
    const template = await obtenerTemplate('test');
    if (!template) {
        console.error('Template no encontrado');
        return;
    }

    if(responsewsp.MessageType === 'image'){
            console.log(responsewsp.MediaUrl0);
        return textTrack(responsewsp.MediaUrl0, responsewsp.MediaContentType0);
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
   try {
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