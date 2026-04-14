const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public'));
app.listen(3000);

// Rutas API
const clientesRoutes = require('./routes/clientes');
const vehiculosRoutes = require('./routes/vehiculos');
const mecanicosRoutes = require('./routes/mecanicos');
const diagnosticosRoutes = require('./routes/diagnosticos');


app.use('/api/clientes', clientesRoutes);
app.use('/api/vehiculos', vehiculosRoutes);
app.use('/api/mecanicos', mecanicosRoutes);
app.use('/api/diagnosticos', diagnosticosRoutes);


app.get('/', (req, res) => {
    res.json({
        mensaje: 'TallerApp API v1.0',
        estado: 'funcionando'
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
    console.log(` Servidor corriendo en http://localhost:${PORT}`);
    console.log(`  Entorno: ${process.env.NODE_ENV || 'development'}`);
});
