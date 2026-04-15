const pool = require('../config/database');

exports.obtenerPresupuestos = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      `SELECT p.*, d.problema_declarado, v.matricula 
      FROM presupuestos p
      JOIN diagnosticos d ON p.diagnostico_id = d.id
      JOIN vehiculos v ON d.vehiculo_id = v.id 
      ORDER BY p.fecha_creacion DESC`
    );
    connection.release();
    res.json({ success: true, data: rows, total: rows.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.generarPresupuesto = async (req, res) => {
  try {
    const { diagnostico_id, lineas } = req.body; // lineas es un array: [{tipo, descripcion, cantidad, precio_unitario}]

    if (!diagnostico_id || !lineas || lineas.length === 0) {
      return res.status(400).json({ success: false, error: 'Faltan datos (diagnostico_id, lineas)' });
    }

    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      let total_mano_obra = 0;
      let total_piezas = 0;

      // Calcular subtotales
      lineas.forEach(linea => {
        let subtotal = Number(linea.cantidad) * Number(linea.precio_unitario);
        if (linea.tipo === 'mano_obra') {
          total_mano_obra += subtotal;
        } else if (linea.tipo === 'pieza') {
          total_piezas += subtotal;
        }
      });

      const base_imponible = total_mano_obra + total_piezas;
      const iva = base_imponible * 0.21; // 21% IVA en España
      const total = base_imponible + iva;

      // Insertar presupuesto principal
      const [result] = await connection.query(
        `INSERT INTO presupuestos (diagnostico_id, total_mano_obra, total_piezas, base_imponible, iva, total, estado) 
        VALUES (?, ?, ?, ?, ?, ?, 'pendiente')`,
        [diagnostico_id, total_mano_obra, total_piezas, base_imponible, iva, total]
      );
      
      const presupuesto_id = result.insertId;

      // Insertar lineas
      for (const linea of lineas) {
        let subtotal = Number(linea.cantidad) * Number(linea.precio_unitario);
        await connection.query(
          `INSERT INTO lineas_presupuesto (presupuesto_id, tipo, descripcion, cantidad, precio_unitario, subtotal) 
          VALUES (?, ?, ?, ?, ?, ?)`,
          [presupuesto_id, linea.tipo, linea.descripcion, linea.cantidad, linea.precio_unitario, subtotal]
        );
      }

      // Actualizar estado de diagnostico a presupuestado
      await connection.query('UPDATE diagnosticos SET estado = "presupuestado" WHERE id = ?', [diagnostico_id]);

      await connection.commit();
      connection.release();

      res.status(201).json({ success: true, message: 'Presupuesto generado exitosamente', id: presupuesto_id });
    } catch (e) {
      await connection.rollback();
      connection.release();
      throw e;
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.cambiarEstadoPresupuesto = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado, firma_cliente } = req.body; // 'aprobado' o 'rechazado'

    const connection = await pool.getConnection();

    let query = 'UPDATE presupuestos SET estado=? WHERE id=?';
    let params = [estado, id];

    if (estado === 'aprobado' && firma_cliente) {
      query = 'UPDATE presupuestos SET estado=?, firma_cliente=?, fecha_firma=NOW() WHERE id=?';
      params = [estado, firma_cliente, id];
    }

    const [result] = await connection.query(query, params);

    // Si se aprueba, automaticamente podriamos crear una orden, pero eso puede ser otro endpoint.
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: 'Presupuesto no encontrado' });
    }

    res.json({ success: true, message: 'Estado del presupuesto actualizado.' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
