const administrador = require('../model/Administrador');
const database = require('../config/db');


module.exports = {

    async verificaLogin(req, res) {
        const dados = req.body;
        const edv = dados.edv; 
        const senha = dados.senha;

        const user = await administrador.findOne({ where: { edv } });
        const senha_correta = await administrador.findOne({ where: {senha}})

        // if (user == null || senha != senha_correta)
        //   return {erro: 'Dados incorretos'}
        // else
            res.render('home_adm_master', { edvLogado: edv });
    }


    // asyn

}
