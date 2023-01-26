// Iniciando Multer
const multer = require("multer");
// Recebendo arquivo do multer que criamos
const config = require('./src/config/multer');
// Cadastro de formulario irá receber um arquivo com o "name" do HTML chamado de "foto"


// Iniciando Route do Express
const express = require('express');
const CadastroJustificativa = require('./src/controllers/CadastroJustificativa');
const route = express.Router();
route.post('/createFormulario', multer(config).single('foto'), CadastroJustificativa.insertJustificativa);

// Importando os Controllers
const home = require('./src/controllers/home');

// Iniciando as rotas

route.get('/', home.pagInicialGet);
route.get('/login', home.pagLogin);
route.get('/cadastro', home.pagCadastro);
route.get('/home', home.pagHomeAdm);
route.get('/declaracoes', home.pagDeclaracoesAdm);
route.get('/criar_turma', home.pagCriarTurmaAdm);
route.get('/gerenciar_turmas', home.pagTurmasAdm);
route.get('/gerenciar_usuarios', home.pagUsuariosAdm);

route.post('/createFormulario', CadastroJustificativa.insertJustificativa);

// route.post('/', home.pagIniciaPost);

// route.get('/')

module.exports = route;