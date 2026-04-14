const express = require('express');
const router = express.Router();
const diagnosticosController = require('../controllers/diagnosticosController');

router.get('/', diagnosticosController.obtenerDiagnosticos);
router.get('/:id', diagnosticosController.obtenerDiagnosticoPorId);
router.post('/', diagnosticosController.crearDiagnostico);
router.put('/:id', diagnosticosController.actualizarDiagnostico);

module.exports = router;
