const pool = require('../config/database');

// GET - Todos los clientes
exports.obtenerClientes = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(
            'SELECT * FROM clientes WHERE activo = true ORDER BY fecha_creacion DESC'
        );
        connection.release();
        res.json({
            success: true,
            data: rows,
            total: rows.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// GET - Cliente por ID
exports.obtenerClientePorId = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await pool.getConnection();
        const [cliente] = await connection.query(
            'SELECT * FROM clientes WHERE id = ? AND activo = true',
            [id]
        );
        connection.release();

        if (cliente.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Cliente no encontrado'
            });
        }

        res.json({
            success: true,
            data: cliente[0]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// POST - Crear cliente
exports.crearCliente = async (req, res) => {
    try {
        const { tipo, nif_cif, nombre, apellidos, email, telefono, forma_pago } = req.body;

        // Validar
        if (!tipo || !nif_cif || !email || !telefono) {
            return res.status(400).json({
                success: false,
                error: 'Faltan campos obligatorios'
            });
        }

        const connection = await pool.getConnection();

        // Verificar NIF único
        const [existe] = await connection.query(
            'SELECT id FROM clientes WHERE nif_cif = ?',
            [nif_cif]
        );

        if (existe.length > 0) {
            connection.release();
            return res.status(409).json({
                success: false,
                error: 'NIF/CIF ya registrado'
            });
        }

        const [result] = await connection.query(
            `INSERT INTO clientes (tipo, nif_cif, nombre, apellidos, email, telefono, forma_pago) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [tipo, nif_cif, nombre || null, apellidos || null, email, telefono, forma_pago]
        );

        connection.release();

        res.status(201).json({
            success: true,
            message: 'Cliente creado exitosamente',
            id: result.insertId
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// PUT - Actualizar cliente
exports.actualizarCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellidos, email, telefono, forma_pago } = req.body;

        const connection = await pool.getConnection();

        const [result] = await connection.query(
            `UPDATE clientes SET nombre=?, apellidos=?, email=?, telefono=?, forma_pago=? WHERE id=? AND activo=true`,
            [nombre, apellidos, email, telefono, forma_pago, id]
        );

        connection.release();

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                error: 'Cliente no encontrado'
            });
        }

        res.json({
            success: true,
            message: 'Cliente actualizado exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// DELETE - Desactivar cliente
exports.eliminarCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await pool.getConnection();

        const [result] = await connection.query(
            'UPDATE clientes SET activo=false WHERE id=?',
            [id]
        );

        connection.release();

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                error: 'Cliente no encontrado'
            });
        }

        res.json({
            success: true,
            message: 'Cliente desactivado'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};