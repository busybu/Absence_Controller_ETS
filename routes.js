// Iniciando Multer
const multer = require("multer");
// Recebendo arquivo do multer que criamos
const config = require('./src/config/multer');

//^^------------------------------------------------------------------------------------------------------------------

// Iniciando Route do Express
const express = require('express');
const route = express.Router();

//^^------------------------------------------------------------------------------------------------------------------


const ControllerHomeJustificativa = require("./src/controllers/ControllerJustificativa");
const ControllerAdms = require("./src/controllers/ControllerAdms");
const home = require("./src/controllers/home");
const ControllerTurma = require("./src/controllers/ControllerTurma");
// Iniciando as rotas

route.post('/createFormulario', multer(config).single('foto'), ControllerHomeJustificativa.postInsertJustificativa);
route.get('/', ControllerHomeJustificativa.pagInicialGet);
route.post('/createFormulario', ControllerHomeJustificativa.postInsertJustificativa);
//////////////////////////////////////////////////////////////////////////

route.get('/cadastro', ControllerAdms.getPagCadastro);
route.post('/cadastroUsuario', ControllerAdms.postInsertUser);

route.get('/login', ControllerAdms.getPagLogin);

route.get('/home', ControllerAdms.getPagHomeAdm);

route.get('/declaracoes', ControllerAdms.getPagDeclaracoes);
route.post('/declaracoes', ControllerAdms.postPagDeclaracoes);

route.get('/gerenciar_usuarios', ControllerAdms.getUsuariosAp);
route.post('/aceitaAdm', ControllerAdms.postAceiteAdm);

route.get('/gerenciar_turmas', home.pagTurmasAdm);

route.post('/aceitarDeclaracao', ControllerAdms.PostAceitarDeclaracao);

//verificar oq fazer
route.get('/verificalogin', ControllerAdms.verificaLogin)

//////////////////////////////////////////////////////////////////////

route.get('/criar_turma', ControllerTurma.getCriarTurma);
route.post('/createTurma', ControllerTurma.postInsertTurma);


route.get('/editTurma/:id', ControllerTurma.getEditTurma);
route.post('/editTurmaP/:id', ControllerTurma.postEditTurma);


route.post('/excluirTurma/:id', ControllerTurma.apagarSala);


module.exports = route;