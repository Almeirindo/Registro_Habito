const express = require('express');
const router = express.Router();
const frequenciaController = require('../controllers/frequenciaController');

router.get('/', frequenciaController.listarFrequencias);
router.post('/', frequenciaController.criarFrequencia);

module.exports = router;
