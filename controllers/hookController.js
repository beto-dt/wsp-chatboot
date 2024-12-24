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
    const { From, Body, MediaUrl0, MediaContentType0 } = req.body; // Número del usuario y mensaje
    const userMessage = Body;
    console.log(userMessage);

    // Inicializa el estado de conversación si no existe
    if (!conversationSteps[From]) {
        conversationSteps[From] = 1; // Paso inicial
    }


    let responseMessage = "";

    try {
        switch (conversationSteps[From]) {
            case 1:
                responseMessage = "¡Hola! Gracias por ser parte de la promoción Con Nestlé , ganar sabe bien en Walmart Supercenter y/o Bodega Aurrera .";
                 await client.messages.create({
                    from: numFrom,
                    to: From,
                    body: responseMessage
                }).then((message) => console.log('Mensaje enviado con SID:', message.sid))
                    .catch((error) => console.error('Error al enviar el mensaje:', error));

                await client.messages.create({
                    contentSid: "HX021c3bd1d8470cce5d8992b5e39ad608",
                    contentVariables: JSON.stringify({ 1: "Name" }),
                    from: numFrom,
                    to: From,
                }).then((message) => console.log('Mensaje enviado con SID:', message.sid))
                    .catch((error) => console.error('Error al enviar el mensaje:', error));
                conversationSteps[From] ++;
                break;

            case 2:
                if (userMessage.includes("SI") || userMessage.includes("si") || userMessage.includes("Si")) {
                    await client.messages.create({
                        contentSid: "HXbe1a2210116de1a50b879e1a47252efb",
                        contentVariables: JSON.stringify({ 1: "Name" }),
                        from: numFrom,
                        to: From,
                    }).then((message) => console.log('Mensaje enviado con SID:', message.sid))
                        .catch((error) => console.error('Error al enviar el mensaje:', error));
                    conversationSteps[From]++;
                } else {
                    responseMessage = "  Lo sentimos, para continuar debes aceptar los Términos y Condiciones y Aviso de Privacidad. ¡Presiona SÍ para aceptar!";
                    await client.messages.create({
                        from: numFrom,
                        to: From,
                        body: responseMessage
                    }).then((message) => console.log('Mensaje enviado con SID:', message.sid))
                        .catch((error) => console.error('Error al enviar el mensaje:', error));
                }

                conversationSteps[From] ++;
                break;

            case 3:
                if (userMessage.includes("SI") || userMessage.includes("si") || userMessage.includes("Si")) {
                    await client.messages.create({
                        contentSid: "HXbe1a2210116de1a50b879e1a47252efb",
                        contentVariables: JSON.stringify({ 1: "Name" }),
                        from: numFrom,
                        to: From,
                    }).then((message) => console.log('Mensaje enviado con SID:', message.sid))
                        .catch((error) => console.error('Error al enviar el mensaje:', error));

                    conversationSteps[From] ++;
                }
                break;

            case 4:
                    responseMessage = " ¡Ganar es muy fácil! Regístrate y comienza a acumular tus compras. Te solicitaré datos por única vez.Por favor compártenos: Tu nombre completo (por ejemplo, Juan Pérez).";
                    await client.messages.create({
                        from: numFrom,
                        to: From,
                        body: responseMessage
                    }).then((message) => console.log('Mensaje enviado con SID:', message.sid))
                        .catch((error) => console.error('Error al enviar el mensaje:', error));
                    conversationSteps[From] ++;
                break;

            case 5:
                responseMessage = "Compártenos:Email (por ejemplo,juan.perez@email.com).";
                await client.messages.create({
                    from: numFrom,
                    to: From,
                    body: responseMessage
                }).then((message) => console.log('Mensaje enviado con SID:', message.sid))
                    .catch((error) => console.error('Error al enviar el mensaje:', error));
                conversationSteps[From] ++;
                break;
                //return textTrack(MediaUrl0, MediaContentType0, From);
                //delete conversationSteps[From]; // Finaliza la conversación

            case 6:
                responseMessage = "¡Muchas gracias por registrarte! Disfruta con recetas Nestlé (IMAGEN DE RECETARIO) ¿En qué podemos ayudarte?";
                await client.messages.create({
                    from: numFrom,
                    to: From,
                    body: responseMessage
                }).then((message) => console.log('Mensaje enviado con SID:', message.sid))
                    .catch((error) => console.error('Error al enviar el mensaje:', error));

                setTimeout(async () => {
                    await client.messages.create({
                        contentSid: "HX583690d64bda7ede903e3a20bf96c426",
                        contentVariables: JSON.stringify({ 1: "Name" }),
                        from: numFrom,
                        to: From,
                    }).then((message) => console.log('Mensaje enviado con SID:', message.sid))
                        .catch((error) => console.error('Error al enviar el mensaje:', error));
                }, 5000);

                conversationSteps[From] ++;
                break;

            case 7:

                if (userMessage.includes(1) ) {
                    await client.messages.create({
                        contentSid: "HXd5af10beca864982fe792b347003a65a",
                        contentVariables: JSON.stringify({ 1: "Name" }),
                        from: numFrom,
                        to: From,
                    }).then((message) => console.log('Mensaje enviado con SID:', message.sid))
                        .catch((error) => console.error('Error al enviar el mensaje:', error));
                    conversationSteps[From]  ++;
                }

                if (userMessage.includes(2) ) {
                    responseMessage = "Chatbot envía imagen de mécanica conforme al máster:\n" +
                        "1. Compra $200.00 en productos Nestlé \n" +
                        "participantes (consulta Productos \n" +
                        "participantes) en Walmart \n" +
                        "Supercenter y/o Bodega Aurrera y \n" +
                        "envíanos una foto de tu ticket de \n" +
                        "compra. \n" +
                        "2.Puedes ser uno de nuestros \n" +
                        "ganadores diarios de fabulosos \n" +
                        "premios digitales. \n" +
                        "¡Sigue registrando tickets y aumenta tu \n" +
                        "oportunidad de ser uno de los ganadores \n" +
                        "semanales o de nuestro premio final!"

                    await client.messages.create({
                        from: numFrom,
                        to: From,
                        body: responseMessage
                    }).then((message) => console.log('Mensaje enviado con SID:', message.sid))
                        .catch((error) => console.error('Error al enviar el mensaje:', error));

                    responseMessage2='¿Quieres registrar un ticket?'
                    await client.messages.create({
                        from: numFrom,
                        to: From,
                        body: responseMessage2
                    }).then((message) => console.log('Mensaje enviado con SID:', message.sid))
                        .catch((error) => console.error('Error al enviar el mensaje:', error));
                    conversationSteps[From] ++;

                }

                if (userMessage.includes(3) ) {
                    responseMessage = "Consulta la lista de productos participantes en: url"
                    await client.messages.create({
                        from: numFrom,
                        to: From,
                        body: responseMessage
                    }).then((message) => console.log('Mensaje enviado con SID:', message.sid))
                        .catch((error) => console.error('Error al enviar el mensaje:', error));

                    responseMessage2='¿Quieres registrar un ticket?'
                    await client.messages.create({
                        from: numFrom,
                        to: From,
                        body: responseMessage2
                    }).then((message) => console.log('Mensaje enviado con SID:', message.sid))
                        .catch((error) => console.error('Error al enviar el mensaje:', error));
                    conversationSteps[From] ++;

                }

                if (userMessage.includes(4) ) {
                    responseMessage = "Revisa los Términos y Condiciones de la promoción en: url"
                    await client.messages.create({
                        from: numFrom,
                        to: From,
                        body: responseMessage
                    }).then((message) => console.log('Mensaje enviado con SID:', message.sid))
                        .catch((error) => console.error('Error al enviar el mensaje:', error));

                    responseMessage2='¿Quieres registrar un ticket?'
                    await client.messages.create({
                        from: numFrom,
                        to: From,
                        body: responseMessage2
                    }).then((message) => console.log('Mensaje enviado con SID:', message.sid))
                        .catch((error) => console.error('Error al enviar el mensaje:', error));
                    conversationSteps[From] ++;

                }

                if (userMessage.includes(5) ) {
                    responseMessage = "Consulta nuestro Aviso de Privacidad en: url"
                    await client.messages.create({
                        from: numFrom,
                        to: From,
                        body: responseMessage
                    }).then((message) => console.log('Mensaje enviado con SID:', message.sid))
                        .catch((error) => console.error('Error al enviar el mensaje:', error));

                    responseMessage2='¿Quieres registrar un ticket?'
                    await client.messages.create({
                        from: numFrom,
                        to: From,
                        body: responseMessage2
                    }).then((message) => console.log('Mensaje enviado con SID:', message.sid))
                        .catch((error) => console.error('Error al enviar el mensaje:', error));
                    conversationSteps[From] ++;

                }
                if (userMessage.includes(6) ) {
                    responseMessage = "Preguntas Frecuentes: \n " +
                        "a) ¿Tiempo de validación? Validación en un lapso no mayor a 2 horas hábiles.\n" +
                        "b) ¿Qué debe tener mi ticket? \n" +
                        "- Fecha completa \n" +
                        "- Nombre de la tienda \n" +
                        "- Productos participantes \n" +
                        "- Costo \n" +
                        "- Número de ticket \n" +
                        "- Código de barras \n" +
                        "c) ¿Qué estados participan? \n" +
                        "Esta promoción es a nivel nacional."
                    await client.messages.create({
                        from: numFrom,
                        to: From,
                        body: responseMessage
                    }).then((message) => console.log('Mensaje enviado con SID:', message.sid))
                        .catch((error) => console.error('Error al enviar el mensaje:', error));
                    responseMessage2='¿Quieres registrar un ticket?'
                    await client.messages.create({
                        from: numFrom,
                        to: From,
                        body: responseMessage2
                    }).then((message) => console.log('Mensaje enviado con SID:', message.sid))
                        .catch((error) => console.error('Error al enviar el mensaje:', error));
                    conversationSteps[From] ++;
                }
                break;

            case 8:
                if (userMessage.includes("SI") || userMessage.includes("si") || userMessage.includes("Si")) {
                    await client.messages.create({
                        contentSid: "HXd5af10beca864982fe792b347003a65a",
                        contentVariables: JSON.stringify({ 1: "Name" }),
                        from: numFrom,
                        to: From,
                    }).then((message) => console.log('Mensaje enviado con SID:', message.sid))
                        .catch((error) => console.error('Error al enviar el mensaje:', error));
                    conversationSteps[From] = 9;
                }

                if (userMessage.includes("NO") || userMessage.includes("no") || userMessage.includes("No")) {
                    responseMessage2='¿Algo más en lo que te pueda ayudar?'
                    await client.messages.create({
                        from: numFrom,
                        to: From,
                        body: responseMessage2
                    }).then((message) => console.log('Mensaje enviado con SID:', message.sid))
                        .catch((error) => console.error('Error al enviar el mensaje:', error));
                    conversationSteps[From] = 9;
                }

                if (userMessage.includes("En línea")) {
                    responseMessage='Ahora por favor, envía una fotografía legible de tu comprobante de compra con pedido entregado con los productos Nestlé adquiridos en línea con un monto mínimo de $200.00 mxn.'
                    await client.messages.create({
                        from: numFrom,
                        to: From,
                        body: responseMessage
                    }).then((message) => console.log('Mensaje enviado con SID:', message.sid))
                        .catch((error) => console.error('Error al enviar el mensaje:', error));
                    conversationSteps[From] = 10;
                }

                if (userMessage.includes("En tienda física")) {
                    responseMessage2=' Ahora por favor, envía una fotografía legible de tu ticket de compra con los productos Nestlé con un monto mínimo de $200.00 mxn.'
                    await client.messages.create({
                        from: numFrom,
                        to: From,
                        body: responseMessage2
                    }).then((message) => console.log('Mensaje enviado con SID:', message.sid))
                        .catch((error) => console.error('Error al enviar el mensaje:', error));
                    conversationSteps[From] =11;
                }
                break
            case 9 :
                if (userMessage.includes("SI") || userMessage.includes("si") || userMessage.includes("Si")) {
                    conversationSteps[From] = 6;
                }

                if (userMessage.includes("NO") || userMessage.includes("no") || userMessage.includes("No") || userMessage.includes("No, gracias")) {
                    responseMessage2='¡Gracias por ser parte de la promoción "Con Nestlé , ganar sabe bien"! Continúa participando por increíbles premios.¡Hasta pronto!'
                    await client.messages.create({
                        from: numFrom,
                        to: From,
                        body: responseMessage2
                    }).then((message) => console.log('Mensaje enviado con SID:', message.sid))
                        .catch((error) => console.error('Error al enviar el mensaje:', error));
                }
                break
            case 10:
                responseMessage='¡Muchas gracias! Vamos a validar tu orden de compra para que puedas empezar a participar.'
                await client.messages.create({
                    from: numFrom,
                    to: From,
                    body: responseMessage
                }).then((message) => console.log('Mensaje enviado con SID:', message.sid))
                    .catch((error) => console.error('Error al enviar el mensaje:', error));

                setTimeout(() => {
                    textTrack(MediaUrl0,MediaContentType0,From);
                }, 5000);
                conversationSteps[From] = 10;
                break;

            case 11:
                responseMessage='¡Muchas gracias! Vamos a validar tu ticket de compra para que puedas empezar a participar.'
                await client.messages.create({
                    from: numFrom,
                    to: From,
                    body: responseMessage
                }).then((message) => console.log('Mensaje enviado con SID:', message.sid))
                    .catch((error) => console.error('Error al enviar el mensaje:', error));

                setTimeout(() => {
                    textTrack(MediaUrl0,MediaContentType0,From);
                }, 5000);
                conversationSteps[From] = 11;
                break

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