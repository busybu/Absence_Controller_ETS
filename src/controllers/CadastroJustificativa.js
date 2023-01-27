const formulario = require('../model/Formulario');

module.exports = {
    async insertJustificativa(req, res) {
        // Recebe as informações do front-end
        const dados = req.body;

        let foto = 'usuario.png';

        if (req.file) {
            foto = req.file.filename;
        }

        console.log(dados.inicio);
        console.log(dados.fim);

        await formulario.create({
            EDV: dados.edv,
            Nome: dados.nome,
            IdTurma: dados.turma,
            Inicio: dados.inicio,
            Fim: dados.fim,
            Descricao: dados.descricao,
            Arquivo: foto
        });
        res.redirect('/');
    }
}