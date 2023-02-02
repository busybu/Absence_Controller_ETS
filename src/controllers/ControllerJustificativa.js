const formulario = require('../model/Formulario');
const turma = require('../model/Turma')

module.exports = {

    //Cria formulario no banco
    async postInsertJustificativa(req, res) {

        const dados = req.body;
        let foto = 'usuario.png';

        if (req.file) {
            foto = req.file.filename;
        }

        await formulario.create({
            EDV: dados.edv,
            Nome: dados.nome,
            IdTurma: dados.turma,
            Inicio: dados.inicio,
            Fim: dados.fim,
            Descricao: dados.descricao,
            Arquivo: foto,
            Status: 0
        });
        res.redirect('/');
    },

    async pagInicialGet(req, res) {
        const turmas = await turma.findAll({
            raw: true,
            attributes: ['ID', 'Nome']
        })
        res.render('../views/index', {turmas, id:''});
    },

}