const Registro = require('../models/Registro');

exports.listarRegistros = async (req, res) => {
    const registros = await Registro.findAll();
    res.json(registros);
};

exports.criarRegistro = async (req, res) => {
    try {
        const novoRegistro = await Registro.create(req.body);
        res.status(201).json(novoRegistro);
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
    }
};
