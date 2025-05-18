const Habito = require('../models/Habito');

exports.listarHabitos = async (req, res) => {
    const habitos = await Habito.findAll();
    res.json(habitos);
};

exports.criarHabito = async (req, res) => {
    try {
        const novoHabito = await Habito.create(req.body);
        res.status(201).json(novoHabito);
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
    }
};
