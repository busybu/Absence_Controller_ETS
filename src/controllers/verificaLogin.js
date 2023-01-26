const administrador = require('../model/Administrador');
const database = require('../config/db');


module.exports = {
    async verificaLogin(req, res) {
        let edv = req.body.edv;
        let senha = req.body.senha;

        const user = await administrador.findOne({
            where: { edv: edv, senha: senha }
        })
        res.render('/home_adm_master', {user});
         
    }

    
    
}
