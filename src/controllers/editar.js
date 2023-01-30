const administrador = require('../model/Administrador');
const formulario = require('../model/Formulario');
const turma = require('../model/Turma');

module.exports = {
    async adicionar(req, res){
        const dados = req.body;
        const id = req.params.id;
        
        // Dando upgrade nas novas informações
        await aluno.update({
            Nome: dados.Nome,
            Inicio: dados.Inicio,
            Fim: dados.Fim,
        },
        {
            where: { ID: id }
        });
        
        res.redirect('/');
    }
}