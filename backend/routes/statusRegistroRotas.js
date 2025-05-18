const express = require('express');
const router = express.Router();
const statusRegistroController = require('../controllers/statusRegistroController');

router.get('/', statusRegistroController.listarStatusRegistros);
router.post('/', statusRegistroController.criarStatusRegistro);

module.exports = router;
