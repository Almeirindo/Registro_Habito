CREATE DATABASE IF NOT EXISTS registro_habitos;
USE registro_habitos;

-- Tabela de usuários
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de frequências (ex: diário, semanal)
CREATE TABLE frequencias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) UNIQUE NOT NULL
);

-- Tabela de hábitos
CREATE TABLE habitos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    frequencia_id INT NOT NULL,
    usuario_id INT NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (frequencia_id) REFERENCES frequencias(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabela de status do registro (ex: feito, não feito)
CREATE TABLE status_registro (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) UNIQUE NOT NULL
);

-- Tabela de registros
CREATE TABLE registros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data DATE NOT NULL,
    status_id INT NOT NULL,
    habito_id INT NOT NULL,
    FOREIGN KEY (status_id) REFERENCES status_registro(id),
    FOREIGN KEY (habito_id) REFERENCES habitos(id) ON DELETE CASCADE
);