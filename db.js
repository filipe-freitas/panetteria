const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/panetteria');

const clienteSchema = new mongoose.Schema({
    id            : Number,
    nome          : String,
    sobrenome     : String,
    telefone      : String,
    cpf           : String,
    cep           : String,
    estado        : String,
    cidade        : String,
    logradouro    : String,
    numLogradouro : String,
    status        : String},{
    collection    : "cliente"}
);

const usuarioSchema = new mongoose.Schema({
    id        : Number,
    nome      : String,
    senha     : String,
    permissao : Number,
    status    : String},{
    collection: "usuario"}
);

const produtoSchema = new mongoose.Schema({
    id         : Number,
    categoria  : String,
    tipo       : String,
    marca      : String,
    descricao  : String,
    peso       : String,
    preco      : String,
    status     : String},{
    collection : "produto"}
);

module.exports = {Mongoose: mongoose,
                  ClienteSchema: clienteSchema,
                  UsuarioSchema: usuarioSchema,
                  ProdutoSchema: produtoSchema};