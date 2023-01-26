const administrador = require('../model/Administrador');
const formulario = require('../model/Formulario');
const turma = require('../model/Turma');

module.exports = {
    async insertTurma(req, res) {
        // Recebe as informações do front-end
        const dados = req.body;

        await turma.create({
            Nome: dados.nome,
            Inicio: dados.inicio,
            Fim: dados.fim
        });
        res.redirect('/');
    }
}