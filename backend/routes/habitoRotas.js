const express = require('express');
const router = express.Router();
const habitoController = require('../controllers/habitoController');

router.get('/', habitoController.listarHabitos);
router.post('/', habitoController.criarHabito);

module.exports = router;
