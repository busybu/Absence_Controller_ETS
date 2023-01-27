const administrador = require('../model/Administrador');

module.exports = {
    async verificaLogin(req, res) {

        console.log(req.body);

        const dados = req.body;
        const edv = dados.edv; 
        const user = await administrador.findOne({ where: { edv } });

        if (!user) {
            return res.status(401).json({ error: 'User does not exist.' });
        }
        // if (!(await user.checkPassword(senha))) {
        //     return res.status(401).json({ error: 'Invalid password.' });
        // }
    }
}
