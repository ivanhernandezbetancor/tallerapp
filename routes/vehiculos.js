const express = require('express');
const router = express.Router();
const vehiculosController = require('../controllers/vehiculosController');

router.get('/', vehiculosController.obtenerVehiculos);
router.get('/:id', vehiculosController.obtenerVehiculoPorId);
router.post('/', vehiculosController.crearVehiculo);
router.get('/:id/historial', vehiculosController.obtenerHistorial);
router.put('/:id', vehiculosController.actualizarVehiculo);
router.delete('/:id', vehiculosController.eliminarVehiculo);

module.exports = router;
