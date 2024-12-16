const FormData = require('form-data');
const axios = require('axios');

async function textTrack(file) {
    try {
        // Verificar si se ha recibido un archivo
        if (file) {
            console.log( 'No se recibió ningún archivo');
        }

        // Crear un objeto FormData
        const formData = new FormData();
        formData.append('multimedia', file.buffer, file.originalname); // Buffer como archivo
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