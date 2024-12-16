const textTrack =  ('/upload', upload.single('multimedia'), async (req, res) => {
    try {
        // Verificar si se ha recibido un archivo
        if (!req.file) {
            return res.status(400).json({ error: 'No se recibió ningún archivo' });
        }

        // Crear un objeto FormData
        const formData = new FormData();
        formData.append('multimedia', req.file.buffer, req.file.originalname); // Buffer como archivo
        // Configurar los encabezados (incluyen los de form-data)
        const headers = {
            ...formData.getHeaders(), // Encabezados generados por FormData
        };

        // Enviar la imagen al endpoint externo
        const externalEndpoint = 'https://general.qa-advantagemkt.mx/demo-textract/bachoco-core/app/validaTextract'; // Cambia por tu URL externa
        const response = await axios.post(externalEndpoint, formData, { headers });

        console.log('Respuesta del endpoint externo:', response.data.validacionTicket.mensajeValidacion);

        // Responder al cliente que subió la imagen
        res.status(200).json({
            message: 'Imagen procesada y enviada al endpoint externo',
            externalResponse: response.data,
        });
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
}

module.exports = {
    textTrack
}