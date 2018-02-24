const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/panetteria');

const panetteriaSchema = new mongoose.Schema({
    id           : Number,
    nome         : String,
    sobrenome    : String,
    telefone     : String,
    cpf          : String,
    cep          : String,
    estado       : String,
    cidade       : String,
    logradouro   : String,
    numLogradouro: String},{
    collection   : 'cliente'}
);

const usuarioSchema = new mongoose.Schema({
    idUsuario       : Number,
    nomeUsuario     : String,
    senhaUsuario    : String,
    permissaoUsuario: Number},{
    collection:'usuario'}
);

module.exports = {Mongoose: mongoose, PanetteriaSchema: panetteriaSchema, UsuarioSchema: usuarioSchema};