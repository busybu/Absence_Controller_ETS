const administrador = require('../model/Administrador');

module.exports = {
    async verificaLogin(req, res) {

        const parametro = req.params.id;

        const administrador = await administrador.findByPk(parametro, {
            raw: true,
            attributes: ['EDV', 'Nome', 'Senha']
        });

        res.render('../views/home_adm_master', {});

    }
}