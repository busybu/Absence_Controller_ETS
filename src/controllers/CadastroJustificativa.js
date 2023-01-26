const administrador = require('../model/Administrador');
const formulario = require('../model/Formulario');
const turma = require('../model/Turma');


module.exports = {
    async formulario(req, res) {
        res.render("/");
    },
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
            Inicio: dados.inicio,
            Fim: dados.fim,
            Descricao: dados.descricao,
            Arquivo: foto
        });
        res.redirect('/createFormulario');
    }
}