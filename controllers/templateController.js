const pool = require('../config/config');

const guardarTemplate =  async (req, res) => {
    const { name, content, language, buttons } = req.body;

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
        return res.status(200).json({
            status: 'success',
            message: 'Template y botones guardados correctamente.',
        });
    } catch (err) {
        await connection.rollback();
        return res.status(500).json({
            status: 'error',
            message: `Error al guardar el template: ${err}`
        });
    } finally {
        connection.release();
    }
}

const obtenerTemplate =  async (req, res) => {
    const { name } = req.params;


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
        return res.status(200).json({
            status: 'success',
            message: template,
        });
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            message: `Error al guardar el template: ${err}`
        });
    } finally {
        connection.release();
    }
}

module.exports = {
    guardarTemplate,
    obtenerTemplate
}