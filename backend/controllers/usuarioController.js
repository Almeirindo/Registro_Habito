const Usuario = require('../models/Usuario');

exports.listarUsuarios = async (req, res) => {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
};

exports.criarUsuario = async (req, res) => {
    try {
        const novoUsuario = await Usuario.create(req.body);
        res.status(201).json(novoUsuario);
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
    }
};
