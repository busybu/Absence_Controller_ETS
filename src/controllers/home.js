const administrador = require('../model/Administrador');
const formulario = require('../model/Formulario');
const turma = require('../model/Turma');


module.exports = {
    async pagInicialGet(req, res) {
        res.render('../views/index');
    },
    async pagLogin(req,res){
        res.render('../views/login-adm')
    },
    async pagCadastro(req, res){
        res.render('../views/cad_adm')
    },
    async pagHomeAdm(req, res){
        res.render('../views/home_adm_master')
    },
    async pagDeclaracoesAdm(req, res){
        res.render('../views/declaracoes_adm')
    },
    async pagCriarTurmaAdm(req,res){
        res.render('../views/criar_turma')
    },
    async pagTurmasAdm(req, res){
        res.render('../views/gerenciar_turma_adm')
    },
    async pagUsuariosAdm(req, res){
        res.render('../views/usuarios_adm')
    }
}