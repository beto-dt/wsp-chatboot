const twilio = require('twilio');
const FormData = require('form-data');
const axios = require('axios');

// Configura las credenciales de Twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID; // Reemplaza con tu Account SID
const authToken = process.env.TWILIO_AUTH_TOKEN;
const numFrom = process.env.NUMEROFROM;
const apiTextTrack = process.env.TEXTTRACK; // Reemplaza con tu Account SID
const client = twilio(accountSid, authToken);
async function textTrack(file, mediaType, from) {


    try {
        // Descargar el archivo usando Axios
        const mediaResponse = await axios.get(file, {
            responseType: 'arraybuffer', // Descargar datos como buffer
            headers: {
                Authorization: `Basic ${Buffer.from(
                    `${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`
                ).toString('base64')}`, // Autenticación con Twilio
            },
        });

        // Crear un objeto FormData
        const formData = new FormData();
        const fileName = `imagen_${Date.now()}.${mediaType.split('/')[1]}`; // Generar nombre de archivo dinámico

        formData.append('multimedia', Buffer.from(mediaResponse.data), {
            filename: fileName,
            contentType: mediaType,
        });
        // Configurar los encabezados (incluyen los de form-data)
        const headers = {
            ...formData.getHeaders(), // Encabezados generados por FormData
        };
        responseMessage = "Importante: El horario registrado en el sistema puede variar debido a la calidad de la conexión, tiempos de respuesta del sistema o situaciones imprevistas. Gracias por tu comprensión.";
        await client.messages.create({
            from: numFrom,
            to: from,
            body: responseMessage
        });

        // Enviar la imagen al endpoint externo
        const externalEndpoint = apiTextTrack; // Cambia por tu URL externa
        const response = await axios.post(externalEndpoint, formData, { headers });

        if (response.data.validacionTicket.validacion.includes("Ticket rechazado")) {
            responseMessage='Ticket u Orden de pedido inválido. Intenta ingresar tu ticket nuevamente.'
            setTimeout(async () => {
                await client.messages.create({
                    from: numFrom,
                    to: From,
                    body: responseMessage
                }).then((message) => console.log('Mensaje enviado con SID:', message.sid))
                    .catch((error) => console.error('Error al enviar el mensaje:', error));
            }, 5000);
        }

    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
    }
}

module.exports = {
    textTrack
}