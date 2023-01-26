
// Iniciando Route do Express

const express = require('express');
const route = express.Router();

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

// route.post('/', home.pagIniciaPost);

// route.get('/')

module.exports = route;