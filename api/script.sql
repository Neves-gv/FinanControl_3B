CREATE TABLE USUARIOS(
id_usuario SERIAL PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
email VARCHAR(150) NOT NULL UNIQUE,
senha VARCHAR(255) NOT NULL,
ativo BOOLEAN DEFAULT TRUE,
tipo_usuario VARCHAR(20)
);

CREATE TABLE CATEGORIAS(
id_categoria SERIAL PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
descricao TEXT,
cor VARCHAR(255) NOT NULL,
icone VARCHAR(255) NOT NULL,
tipo CHAR(10),
ativo CHAR (1)
);

CREATE TABLE SUBCATEGORIAS(
id_subcategoria SERIAL PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
ativo CHAR (1),
id_categoria INT,
FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
);

CREATE TABLE TRANSACOES(
id_transacao SERIAL PRIMARY KEY,
valor NUMERIC(12,2) NOT NULL,
descricao TEXT,
data_registro DATE,
data_vencimento DATE,
data_pagamento DATE,
tipo CHAR(1),
id_usuario INT,
id_subcategoria INT,
Id_categoria INT,
FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria),
FOREIGN KEY (id_subcategoria) REFERENCES subcategorias(id_subcategoria)
);