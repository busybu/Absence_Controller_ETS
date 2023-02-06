const formulario = require('../model/Formulario');
const turma = require('../model/Turma')

module.exports = {

    //Cria formulario no banco
    async postInsertJustificativa(req, res) {

        const dados = req.body;
        let foto = '';

        const inicio = Date.parse(dados.inicio);
        const fim = Date.parse(dados.fim);

        if (req.file) {
            foto = req.file.filename;
        }

        await formulario.create({
            EDV: dados.edv,
            Nome: dados.nome,
            IdTurma: dados.turma,
            Inicio: dados.inicio,
            Fim: dados.fim,
            Motivo: dados.motivo,
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
        });

        var formatter = new Intl.DateTimeFormat('pt-BR');
        var date = new Date();
        const dt = formatter.format(date).split('/');
        console.log(dt);
        var data = dt[2] + '-' + dt[1] + '-' + dt[0]

        res.render('../views/index', { turmas, id: '', data });
    },

    
}