const administrador = require('../model/Administrador');
const database = require('../config/db');


module.exports = {

    async verificaLogin(req, res) {
        const dados = req.body;
        const edv = dados.edv; 
        const senha = dados.senha;

        const user = await administrador.findOne({ where: { edv } });

        if (user == null)
        {
            console.log('invalido');
            return;
        }

        if (user.Senha != senha)
        {
            console.log("Senha Inválida")
            return;
        }

        res.render('home_adm_master', { edvLogado: edv });
    }


    // asyn

}
