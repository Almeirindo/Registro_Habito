const Frequencia = require('../models/Frequencia');

exports.listarFrequencias = async (req, res) => {
    const frequencias = await Frequencia.findAll();
    res.json(frequencias);
};

exports.criarFrequencia = async (req, res) => {
    try {
        const novaFrequencia = await Frequencia.create(req.body);
        res.status(201).json(novaFrequencia);
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
    }
};
