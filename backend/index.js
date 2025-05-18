const express = require('express');
const app = express();
const sequelize = require('./config/database');
const usuarioRotas = require('./routes/usuarioRotas');
const frequenciaRotas = require('./routes/frequenciaRotas');
const habitoRotas = require('./routes/habitoRotas');
const statusRegistroRotas = require('./routes/statusRegistroRotas');
const registroRotas = require('./routes/registroRotas');
const Usuario = require('./models/Usuario');

app.use(express.json());
app.use('/usuarios', usuarioRotas);
app.use('/frequencias', frequenciaRotas);
app.use('/habitos', habitoRotas);
app.use('/status_registro', statusRegistroRotas);
app.use('/registros', registroRotas);

// Sincroniza os modelos com o banco
sequelize.sync()
    .then(() => {
        console.log('Conectado ao MySQL e sincronizado.');
        app.listen(3000, () => {
            console.log('✅✅Servidor rodando na porta 3000');
        });
    })
    .catch((err) => {
        console.error('❌Erro ao conectar ao MySQL:', err);
    });
