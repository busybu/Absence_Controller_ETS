const administrador = require('../model/Administrador');
const formulario = require('../model/Formulario');
const turma = require('../model/Turma');



 
module.exports= {
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

   
}