const pool = require('../config/config');

async function guardarTemplate(name, content, language, buttons) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // Inserta el template
        const [templateResult] = await connection.execute(
            'INSERT INTO templates (name, content, language) VALUES (?, ?, ?)',
            [name, content, language]
        );

        const templateId = templateResult.insertId;

        // Inserta los botones asociados
        for (const button of buttons) {
            await connection.execute(
                'INSERT INTO buttons (template_id, type, label, action) VALUES (?, ?, ?, ?)',
                [templateId, button.type, button.label, button.action]
            );
        }

        await connection.commit();
        console.log('Template y botones guardados correctamente.');
    } catch (err) {
        await connection.rollback();
        console.error('Error al guardar el template:', err);
    } finally {
        connection.release();
    }
}

async function obtenerTemplate(name) {
    const connection = await pool.getConnection();
    try {
        // Obtener el template por nombre
        const [templates] = await connection.execute(
            'SELECT * FROM templates WHERE name = ?',
            [name]
        );

        if (templates.length === 0) {
            throw new Error('Template no encontrado');
        }

        const template = templates[0];

        // Obtener botones relacionados
        const [buttons] = await connection.execute(
            'SELECT * FROM buttons WHERE template_id = ?',
            [template.id]
        );

        template.buttons = buttons;
        return template;
    } catch (err) {
        console.error('Error al obtener el template:', err);
        return null;
    } finally {
        connection.release();
    }
}

module.exports = {
    guardarTemplate,
    obtenerTemplate
}