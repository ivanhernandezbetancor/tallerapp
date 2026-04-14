const pool = require('../config/database');

exports.obtenerDiagnosticos = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      `SELECT d.*, v.matricula, v.marca, v.modelo, m.nombre as mecanico_nombre 
       FROM diagnosticos d 
       JOIN vehiculos v ON d.vehiculo_id = v.id 
       LEFT JOIN mecanicos m ON d.mecanico_id = m.id 
       ORDER BY d.fecha_creacion DESC`
    );
    connection.release();
    res.json({ success: true, data: rows, total: rows.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.crearDiagnostico = async (req, res) => {
  try {
    const { vehiculo_id, mecanico_id, problema_declarado, diagnostico_tecnico, fotos_entrada } = req.body;

    if (!vehiculo_id || !problema_declarado) {
      return res.status(400).json({ success: false, error: 'Faltan campos obligatorios (vehiculo_id, problema_declarado)' });
    }

    const connection = await pool.getConnection();
    const fotosJson = fotos_entrada ? JSON.stringify(fotos_entrada) : null;
    
    const [result] = await connection.query(
      `INSERT INTO diagnosticos (vehiculo_id, mecanico_id, problema_declarado, diagnostico_tecnico, fotos_entrada) 
       VALUES (?, ?, ?, ?, ?)`,
      [vehiculo_id, mecanico_id || null, problema_declarado, diagnostico_tecnico || null, fotosJson]
    );
    connection.release();

    res.status(201).json({ success: true, message: 'Diagnostico creado exitosamente', id: result.insertId });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.obtenerDiagnosticoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [diagnostico] = await connection.query(
      `SELECT d.*, v.matricula, v.marca, v.modelo, m.nombre as mecanico_nombre 
       FROM diagnosticos d 
       JOIN vehiculos v ON d.vehiculo_id = v.id 
       LEFT JOIN mecanicos m ON d.mecanico_id = m.id 
       WHERE d.id = ?`,
      [id]
    );
    connection.release();

    if (diagnostico.length === 0) {
      return res.status(404).json({ success: false, error: 'Diagnostico no encontrado' });
    }

    res.json({ success: true, data: diagnostico[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.actualizarDiagnostico = async (req, res) => {
  try {
    const { id } = req.params;
    const { mecanico_id, problema_declarado, diagnostico_tecnico, estado } = req.body;

    const connection = await pool.getConnection();
    
    const [result] = await connection.query(
      `UPDATE diagnosticos 
       SET mecanico_id=?, problema_declarado=?, diagnostico_tecnico=?, estado=? 
       WHERE id=?`,
      [mecanico_id, problema_declarado, diagnostico_tecnico, estado, id]
    );
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: 'Diagnostico no encontrado' });
    }

    res.json({ success: true, message: 'Diagnostico actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
