const administrador = require('../model/Administrador');
const formulario = require('../model/Formulario');
const turma = require('../model/Turma');

module.exports= {
    async pagTurmasAdm(req, res){
        const turmas = await turma.findAll({
            raw: true,
            attributes: ['ID', 'Nome', 'Inicio', 'Fim']
        })
        const edvLogado = req.cookies.edvLogado;
        res.cookie('edvLogado', edvLogado);
        res.render('../views/gerenciar_turma_adm', {turmas})
    },

    async pagUsuariosAdm(req, res){
        const administradores = await administrador.findAll({
            raw: true,
            attributes: ['EDV','Nome']
        });
        const edvLogado = req.cookies.edv;
        res.cookie('edvLogado', edvLogado);
        res.render('../views/usuarios_adm', {administradores})
    }
   
}