const pool = require('../config/database');

exports.obtenerMecanicos = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      'SELECT * FROM mecanicos WHERE activo = true ORDER BY fecha_creacion DESC'
    );
    connection.release();
    res.json({ success: true, data: rows, total: rows.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.obtenerMecanicoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [mecanico] = await connection.query(
      'SELECT * FROM mecanicos WHERE id = ? AND activo = true', 
      [id]
    );
    connection.release();
    
    if (mecanico.length === 0) {
      return res.status(404).json({ success: false, error: 'Mecanico no encontrado' });
    }
    
    res.json({ success: true, data: mecanico[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.crearMecanico = async (req, res) => {
  try {
    const { nombre, email, telefono, especialidad } = req.body;

    if (!nombre) {
      return res.status(400).json({ success: false, error: 'Faltan campos obligatorios (nombre)' });
    }

    const connection = await pool.getConnection();
    const [result] = await connection.query(
      `INSERT INTO mecanicos (nombre, email, telefono, especialidad) 
       VALUES (?, ?, ?, ?)`,
      [nombre, email || null, telefono || null, especialidad || null]
    );

    connection.release();

    res.status(201).json({ success: true, message: 'Mecanico creado exitosamente', id: result.insertId });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.actualizarMecanico = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, telefono, especialidad } = req.body;

    const connection = await pool.getConnection();
    
    const [result] = await connection.query(
      `UPDATE mecanicos 
       SET nombre=?, email=?, telefono=?, especialidad=? 
       WHERE id=? AND activo=true`,
      [nombre, email, telefono, especialidad, id]
    );
    
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: 'Mecanico no encontrado' });
    }

    res.json({ success: true, message: 'Mecanico actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.eliminarMecanico = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    
    const [result] = await connection.query(
      'UPDATE mecanicos SET activo=false WHERE id=?',
      [id]
    );
    
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: 'Mecanico no encontrado' });
    }

    res.json({ success: true, message: 'Mecanico desactivado' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
