const StatusRegistro = require('../models/StatusRegistro');

exports.listarStatusRegistros = async (req, res) => {
    const statusRegistros = await StatusRegistro.findAll();
    res.json(statusRegistros);
};

exports.criarStatusRegistro = async (req, res) => {
    try {
        const novoStatusRegistro = await StatusRegistro.create(req.body);
        res.status(201).json(novoStatusRegistro);
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
    }
};
