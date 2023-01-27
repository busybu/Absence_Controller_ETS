const administrador = require('../model/Administrador');
const formulario = require('../model/Formulario');
const turma = require('../model/Turma');


module.exports = {
    async pagDeclaracoesAdm(req, res) {
        const declaracoes = await formulario.findAll({
            raw: true,
            attributes: ['ID', 'Nome', 'Inicio']
        })

        const turmas = await turma.findAll({
            raw: true,
            attributes: ['ID', 'Nome', 'Inicio', 'Fim']
        })
        res.render('../views/declaracoes_adm', { id: '', turmas, declaracoes })
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
    async pagTurmasAdm(req, res){
        const turmas = await turma.findAll({
            raw: true,
            attributes: ['ID', 'Nome']
        })
        res.render('../views/gerenciar_turma_adm', {turmas})
    },
    async pagUsuariosAdm(req, res){
        const administradores = await administrador.findAll({
            raw: true,
            attributes: ['EDV','Nome']
        })
        res.render('../views/usuarios_adm', {administradores})
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
    async pagCriarTurmaAdm(req, res) {
        res.render('../views/criar_turma')
    }
}