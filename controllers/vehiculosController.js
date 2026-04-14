const pool = require('../config/database');

exports.obtenerVehiculos = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      `SELECT v.*, c.nombre as cliente_nombre, c.apellidos as cliente_apellidos 
      FROM vehiculos v 
      JOIN clientes c ON v.cliente_id = c.id 
      ORDER BY v.fecha_creacion DESC`
    );
    connection.release();
    res.json({ success: true, data: rows, total: rows.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.obtenerVehiculoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [vehiculo] = await connection.query(
      `SELECT v.*, c.nombre as cliente_nombre, c.apellidos as cliente_apellidos 
      FROM vehiculos v 
      JOIN clientes c ON v.cliente_id = c.id 
      WHERE v.id = ?`, 
      [id]
    );
    connection.release();
    
    if (vehiculo.length === 0) {
      return res.status(404).json({ success: false, error: 'Vehiculo no encontrado' });
    }
    
    res.json({ success: true, data: vehiculo[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.crearVehiculo = async (req, res) => {
  try {
    const { cliente_id, matricula, marca, modelo, version, anio, kilometraje, tipo_vehiculo, vin_bastidor, observaciones } = req.body;

    if (!cliente_id || !matricula || !marca || !modelo) {
      return res.status(400).json({ success: false, error: 'Faltan campos obligatorios (cliente_id, matricula, marca, modelo)' });
    }

    const connection = await pool.getConnection();

    const [existe] = await connection.query('SELECT id FROM vehiculos WHERE matricula = ?', [matricula]);

    if (existe.length > 0) {
      connection.release();
      return res.status(409).json({ success: false, error: 'Matricula ya registrada' });
    }

    const [result] = await connection.query(
      `INSERT INTO vehiculos (cliente_id, matricula, marca, modelo, version, anio, kilometraje, tipo_vehiculo, vin_bastidor, observaciones) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [cliente_id, matricula, marca, modelo, version || null, anio || null, kilometraje || 0, tipo_vehiculo || 'turismo', vin_bastidor || null, observaciones || null]
    );

    connection.release();

    res.status(201).json({ success: true, message: 'Vehiculo creado exitosamente', id: result.insertId });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.actualizarVehiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const { marca, modelo, version, anio, kilometraje, tipo_vehiculo, vin_bastidor, observaciones } = req.body;

    const connection = await pool.getConnection();
    
    const [result] = await connection.query(
      `UPDATE vehiculos 
      SET marca=?, modelo=?, version=?, anio=?, kilometraje=?, tipo_vehiculo=?, vin_bastidor=?, observaciones=? 
      WHERE id=?`,
      [marca, modelo, version, anio, kilometraje, tipo_vehiculo, vin_bastidor, observaciones, id]
    );
    
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: 'Vehiculo no encontrado' });
    }

    res.json({ success: true, message: 'Vehiculo actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.eliminarVehiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    
    const [result] = await connection.query('DELETE FROM vehiculos WHERE id=?', [id]);
    
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: 'Vehiculo no encontrado' });
    }

    res.json({ success: true, message: 'Vehiculo eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.obtenerHistorial = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    
    const [diagnosticos] = await connection.query('SELECT * FROM diagnosticos WHERE vehiculo_id = ? ORDER BY fecha_creacion DESC', [id]);
    
    for(let d of diagnosticos) {
        const [pres] = await connection.query('SELECT * FROM presupuestos WHERE diagnostico_id = ?', [d.id]);
        if(pres.length > 0) {
            d.presupuesto = pres[0];
            const [ord] = await connection.query('SELECT * FROM ordenes WHERE presupuesto_id = ?', [d.presupuesto.id]);
            if(ord.length > 0) {
              d.orden = ord[0];
               const [lineas] = await connection.query('SELECT * FROM lineas_orden WHERE orden_id = ?', [d.orden.id]);
              d.orden.lineas = lineas;
            }
        }
    }
    
    res.json({ success: true, data: { diagnosticos } });
    connection.release();
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
