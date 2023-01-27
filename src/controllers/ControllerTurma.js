const turma = require('../model/Turma');

module.exports = {

    //Cria uma turma nova no banco de dados
    async postInsertTurma(req, res) {
        // Recebe as informações do front-end
        const dados = req.body;

        await turma.create({
            Nome: dados.nome,
            Inicio: dados.inicio,
            Fim: dados.fim
        });
        res.redirect('/');
    },

    // ^^-----------------------------------------------------------------------------------------------------------------------------------------

    //Direcionando para pag criar turma
    async getCriarTurma(req, res) {
        res.render('../views/criar_turma');
    }

}