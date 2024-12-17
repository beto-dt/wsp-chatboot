const FormData = require('form-data');
const axios = require('axios');

async function textTrack(file, mediaType) {


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

        // Enviar la imagen al endpoint externo
        const externalEndpoint = 'https://general.qa-advantagemkt.mx/demo-textract/bachoco-core/app/validaTextract'; // Cambia por tu URL externa
        const response = await axios.post(externalEndpoint, formData, { headers });

        console.log('Respuesta del endpoint externo:', response.data.validacionTicket.mensajeValidacion);

    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
    }
}

module.exports = {
    textTrack
}