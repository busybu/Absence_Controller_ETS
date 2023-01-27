const administrador = require('../model/Administrador');
const database = require('../config/db');


module.exports = {
    async verificaLogin(req, res) {
        const dados = req.body;
        const edv = dados.edv; 
        const user = await administrador.findOne({ where: { edv } });


    }

    
    
}
