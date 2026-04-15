const express = require('express');
const router = express.Router();
const presupuestosController = require('../controllers/presupuestosController');

router.get('/', presupuestosController.obtenerPresupuestos);
router.post('/', presupuestosController.generarPresupuesto);
router.put('/:id/estado', presupuestosController.cambiarEstadoPresupuesto);

module.exports = router;
