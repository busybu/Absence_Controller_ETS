const administrador = require('../model/Administrador');
const formulario = require('../model/Formulario');
const turma = require('../model/Turma');


module.exports = {
    async pagDeclaracoesAdm(req, res) {
        const declaracoes = await formulario.findAll({
            raw: true,
            attributes: ['ID', 'Nome', 'Inicio']
        })
        res.render('../views/declaracoes_adm', { declaracoes, id: '', turmas: '' })
    },
    async pagDeclaracoesAdmPost(req, res) {
        const id = req.body.nome
        const turmas = await turma.findAll({
            raw: true,
            attributes: ['ID', 'Nome']
        })
        const declaracoes = await formulario.findAll({
            raw: true,
            attributes: ['ID', 'Nome', 'Inicio']
        })
        res.render('../views/declaracoes_adm', { turmas, declaracoes, id })

    },
    async pagInicialGet(req, res) {
        res.render('../views/index');
    },
    async pagLogin(req, res) {
        res.render('../views/login-adm')
    },
    async pagCadastro(req, res) {
        res.render('../views/cad_adm')
    },
    async pagHomeAdm(req, res) {
        res.render('../views/home_adm_master')
    },
    async pagDeclaracoesAdm(req, res) {
        res.render('../views/declaracoes_adm')
    },
    async pagCriarTurmaAdm(req, res) {
        res.render('../views/criar_turma')
    },
    async pagTurmasAdm(req, res) {
        res.render('../views/gerenciar_turma_adm')
    },
    async pagUsuariosAdm(req, res) {
        res.render('../views/usuarios_adm')
    }
}