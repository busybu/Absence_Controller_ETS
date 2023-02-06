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
        const turmas = await turma.findAll({
            raw: true,
            attributes: ['ID', 'Nome', 'Inicio', 'Fim']
        });

        res.redirect('/gerenciar_turmas');
    },
    // ^^-----------------------------------------------------------------------------------------------------------------------------------------
    //edit Turma
    async postEditTurma(req, res) {
        // Recebe as informações do front-end
        const dados = req.body;
        const id = req.params.id;

        if (dados.nome == '' || dados.inicio == '' || dados.fim == '') {
            const turmas = await turma.findOne({ where: { id } });
            if (dados.nome == '') {
                nome = turmas.Nome;
            }
            else {
                nome = dados.nome;

            }
            if (dados.inicio == '') {
                inicio = turmas.Inicio;
            }
            else {
                inicio = new Date(dados.inicio);
            }
            if (dados.fim == '') {
                fim = turmas.Fim
            }
            else {
                fim = new Date(dados.fim);
            }

            await turma.update({
                Nome: nome,
                Inicio: inicio,
                Fim: fim
            },
                {
                    where: { ID: id }
                });

            return res.redirect('/gerenciar_turmas');
        }
    },

    // ^^-----------------------------------------------------------------------------------------------------------------------------------------

    //Direcionando para pag criar turma
    async getCriarTurma(req, res) {
        const edvLogado = req.cookies.edv;
        res.cookie('edvLogado', edvLogado);
        res.render('../views/criar_turma');
    },

    // ^^-----------------------------------------------------------------------------------------------------------------------------------------
    //Direcionando para pag editar turma
    async getEditTurma(req, res) {
        const parametro = req.params.id;
        const turmas = await turma.findByPk(parametro, {
            raw: true,
            attributes: ['ID', 'Nome', 'Inicio', 'Fim']
        });

        res.render('../views/editarTurma', { turmas });
    },

    // ^^-----------------------------------------------------------------------------------------------------------------------------------------

    async apagarSala(req, res) {
        const id = req.params.id;
        turma.destroy(
            {
                where: { ID: id }
            });

        const turmas = await turma.findAll({
            raw: true,
            attributes: ['ID', 'Nome', 'Inicio', 'Fim']
        });

        res.redirect('/gerenciar_turmas');
    },
}