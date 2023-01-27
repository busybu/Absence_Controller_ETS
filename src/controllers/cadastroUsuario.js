const administrador = require('../model/Administrador');

module.exports = {
    async insertUser(req, res) {
        // Recebe as informações do front-end
        const dados = req.body;

        console.log(dados);

        await administrador.create({
            EDV: dados.edv,
            Nome: dados.nome,
            Senha: dados.senha
        });
        res.redirect('/');
    }
}