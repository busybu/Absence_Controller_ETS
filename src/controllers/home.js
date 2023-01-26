const declaracao = require('../model/formulario')
const turma = require('../model/turmas')
module.exports = {
    async pagDeclaracoesAdm(req, res) {
        const declaracoes = await declaracao.findAll({
            raw: true,
            attributes: ['ID', 'Nome', 'Inicio']
        })
        res.render('../views/declaracoes_adm', { declaracoes })
    },
    async pagDeclaracoesAdmPost(req, res){
        const id = req.body.nome
        const turmas = await turmas.findAll({
            //precisa criar ainda a model de turma
        })
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