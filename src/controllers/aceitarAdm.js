const administrador = require('../model/Administrador');

module.exports = {
    async editAdm(req, res) {

        const dados = req.body;

        const edv = req.

        await administrador.update({
            Master: dados.master,
            Ativo: dados.ativo
        },
            {
                where: { EDV: edv }
            });

        res.redirect('/');
    },
    await administrador.update({
        EDV: dados.edv,
        Nome: dados.nome,
        Senha: dados.senha
    });
    res.redirect('/');
}
}