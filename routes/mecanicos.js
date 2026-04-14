const express = require('express');
const router = express.Router();
const mecanicosController = require('../controllers/mecanicosController');

router.get('/', mecanicosController.obtenerMecanicos);
router.get('/:id', mecanicosController.obtenerMecanicoPorId);
router.post('/', mecanicosController.crearMecanico);
router.put('/:id', mecanicosController.actualizarMecanico);
router.delete('/:id', mecanicosController.eliminarMecanico);

module.exports = router;
