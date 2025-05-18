const express = require('express');
const router = express.Router();
const registroController = require('../controllers/registroController');

router.get('/', registroController.listarRegistros);
router.post('/', registroController.criarRegistro);

module.exports = router;
