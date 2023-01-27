const administrador = require('../model/Administrador');


//Cadastrar Adm




module.exports = {

    //acessar pagina declaracoes
    async getPagDeclaracoes(req, res) {
        const turmas = await turmas.findAll({
            raw: true,
            attributes: ['ID', 'Nome', 'Inicio', 'Fim']
        })
        res.render('../views/cadastro', { turmas, id: '' });
    },

    // ^^-----------------------------------------------------------------------------------------------------------------------------------------

    //acessar pag declaracoes conforme turma escolhida
    async postPagDeclaracoes(req, res) {
        const id = req.body.nome;
        const declaracoes = await formulario.findAll({
            raw: true,
            attributes: ['ID', 'Nome', 'Inicio', 'Conferido'],
            where: { ID: id }
        })
        const turmas = await turmas.findByPk({ raw: true, attributes: ['ID', 'Nome'] })


        res.render('../views/declaracoes_adm', { turmas, declaracoes, id })
    },

    // ^^-----------------------------------------------------------------------------------------------------------------------------------------

    //direcionar para pagina que verifica adm (aceita/edita adm)
    async getAceiteAdm(req, res) {

        const administradores = await administrador.findAll({
            raw: true,
            attributes: ['EDV', 'Nome']
        })
        res.render('../views/usuarios_adm', { administradores })
    },

    // ^^-----------------------------------------------------------------------------------------------------------------------------------------

    //aceitar adm (liberar master ou nao)
    async postAceiteAdm(req, res) {

        const dados = req.body;
        const edv = req.body.edv

        await administrador.update({
            Master: dados.master,
            Ativo: dados.ativo
        },
            {
                where: { EDV: edv }
            });

        res.redirect('gerenciar_usuarios');
    },

    // ^^-----------------------------------------------------------------------------------------------------------------------------------------

    //direcionar para pagina login de adm
    async getPagLogin(req, res) {
        res.render('../views/login-adm')
    },

    // ^^-----------------------------------------------------------------------------------------------------------------------------------------

    //direcionar para pagina de cadastro para adm
    async getPagCadastro(req, res) {
        res.render('../views/cad_adm', { nome: '', senha: '', edv: '' })
    },

    // ^^-----------------------------------------------------------------------------------------------------------------------------------------

    //direcionar para pagina de home adm master
    async getPagHomeAdm(req, res) {
        res.render('../views/home_adm_master')
    },

    // ^^-----------------------------------------------------------------------------------------------------------------------------------------

    //cria um novo usuario no bd
    async postInsertUser(req, res) {
        // Recebe as informações do front-end
        const dados = req.body;

        console.log(dados);

        await administrador.create({
            EDV: dados.edv,
            Nome: dados.nome,
            Senha: dados.senha
        });
        res.redirect('/');
    },

    // ^^-----------------------------------------------------------------------------------------------------------------------------------------

    //direcionar para pagina que verifica adm (aceita/edita adm)
    async getUsuariosAp(req, res) {

        const administradores = await administrador.findAll({
            raw: true,
            attributes: ['EDV', 'Nome']
        })
        res.render('../views/usuarios_adm', { administradores })
    },

    // ^^-----------------------------------------------------------------------------------------------------------------------------------------

    //verifica se o login é valido 
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

        console.log(user.Master, '1');

        if(user.Master == 0)
        {
            console.log(user.Master, '2');
            const id = user.edv;
            const declaracoes = await formulario.findAll({
                raw: true,
                attributes: ['ID', 'Nome', 'Inicio', 'Conferido'],
                where: { ID: id }
            })

            const turmas = await turmas.findByPk({ raw: true, attributes: ['ID', 'Nome'] })
            res.render('../views/declaracoes_adm', { turmas, declaracoes, id });

            return;
        }
        else{
            console.log(user.Master, '3');

            res.render('home_adm_master', { edvLogado: edv });

    }

    }


}
