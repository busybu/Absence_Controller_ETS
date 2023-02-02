
const administrador = require('../model/Administrador');
const turmas = require('../model/Turma');
const formulario = require('../model/formulario');
//Cadastrar Adm


module.exports = {

    //acessar pagina declaracoes
    async getPagDeclaracoes(req, res) {

        const dados = req.cookies;
        console.log(dados)
        const edvLogado = dados.edvLogado;
        console.log('edvLogado: ' + edvLogado)
        const turma = await turmas.findAll({
            raw: true,
            attributes: ['ID', 'Nome', 'Inicio', 'Fim']
        });
        const declaracoe = await formulario.findAll({
            raw: true,
            attributes: ['ID', 'Nome', 'Inicio', 'IdAdmConferiu', 'Fim', 'Descricao', 'Arquivo', 'IdTurma', 'EDV'],
        });
        res.cookie('edvAdm', edvLogado);
        res.render('../views/declaracoes_adm', { turma, id: '', declaracoe });
    },

    // ^^-----------------------------------------------------------------------------------------------------------------------------------------

    // acessar pag declaracoes conforme turma escolhida
    async postPagDeclaracoes(req, res) {
        //colocar o objeto que vc quer procurar
        const id = req.body.turma;
        const declaracoe = await formulario.findAll({
            raw: true,
            attributes: ['ID', 'Nome', 'Inicio', 'IdAdmConferiu'],
            where: { IdTurma: id }
        })
        const turma = await turmas.findAll({ attributes: ['ID', 'Nome'] });
        res.render('../views/declaracoes_adm', { turma, declaracoe, id });
    },

    //aceitar declaracao
    async PostAceitarDeclaracao(req, res) {
        const dados = req.body;
        const id = dados.id;
        console.log(dados)
        console.log(req.cookies.edvAdm)
        // Dando upgrade nas novas informações
        await formulario.update({
            IdAdmConferiu: req.cookies.edvAdm,
        },
            {
                where: { ID: id },
            });

        res.cookie('edvAdm', req.cookies.edvAdm);
        //erro de não poder realizar duas confirmações de formulário sem refazer o login (o login não esta sendo passado na url quando redireciona)
        res.redirect('/');
    },
    // ^^-----------------------------------------------------------------------------------------------------------------------------------------

    //direcionar para pagina que verifica adm (aceita/edita adm)
    async getAceiteAdm(req, res) {

        const administradores = await administrador.findAll({
            raw: true,
            attributes: ['EDV', 'Nome', 'Ativo', 'Master'],
        })
        console.log(administradores)

        res.render('../views/usuarios_adm', { administradores })
    },


    // ^^-----------------------------------------------------------------------------------------------------------------------------------------



    //aceitar adm (liberar master ou nao)
    async postAceiteAdm(req, res) {

        const dados = req.body;
        const edv = req.body.edv;
        const edvR = req.body.edvR;
        const master = req.body.master;
        const masterR = req.body.masterR;


        const administradores = await administrador.findAll({
            raw: true,
            attributes: ['EDV', 'Nome'],

        });

        if (edvR) {
            administrador.destroy(
                {
                    where: { EDV: edvR }
                });

            const edvLogado = req.cookies.edvLogado;
            res.cookie('edvLogado', edvLogado);
            res.redirect('/gerenciar_usuarios/');
        }
        else if (edv) {
            await administrador.update({
                Master: dados.master,
                Ativo: 1
            },
                {
                    where: { EDV: edv }
                });
            const edvLogado = req.cookies.edvLogado;
            res.cookie('edvLogado', edvLogado);
            res.redirect('/gerenciar_usuarios/');
        }

        if (master) {
            await administrador.update({
                Master: 1,
                Ativo: dados.ativo
            },
                {
                    where: { EDV: master }
                });
            const edvLogado = req.cookies.edvLogado;
            res.cookie('edvLogado', edvLogado);
            res.redirect('/gerenciar_usuarios/');
        }
        else if (masterR) {
            await administrador.update({
                Master: 0,
                Ativo: dados.ativo
            },
                {
                    where: { EDV: masterR }
                });
            const edvLogado = req.cookies.edvLogado;
            res.cookie('edvLogado', edvLogado);
            res.redirect('/gerenciar_usuarios/');
        }

        // const edvLogado = req.cookies.edvLogado;
        // res.cookie('edvLogado', edvLogado);
        // res.redirect('/gerenciar_usuarios/');
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

    // direcionar para pagina de home adm master
    async getPagHomeAdm(req, res) {
        const edvLogado = req.cookies.edvLogado;
        res.cookie('edvLogado', edvLogado);
        res.render('../views/home_adm_master', { edvLogado })
    },

    // ^^-----------------------------------------------------------------------------------------------------------------------------------------

    //cria um novo usuario no bd
    async postInsertUser(req, res) {
        // Recebe as informações do front-end
        const dados = req.body;
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
            attributes: ['EDV', 'Nome', 'Ativo', 'Master'],
        });
        const edvLogado = req.cookies.edvLogado;
        res.cookie('edvLogado', edvLogado);
        res.render('../views/usuarios_adm', { administradores, edvLogado })
    },

    // ^^-----------------------------------------------------------------------------------------------------------------------------------------

    //direcionar para pagina que vque gerencia turmas


    // ^^-----------------------------------------------------------------------------------------------------------------------------------------

    //verifica se o login é valido 
    async verificaLogin(req, res) {

        const dados = req.query;
        const edv = dados.edv;
        const senha = dados.senha;

        const user = await administrador.findOne({ where: { edv } });

        if (user == null) {
            return res.sendStatus(400);
        }

        if (user.Senha != senha) {
            return res.sendStatus(400);
        }

        if (user.Ativo == 0) {
            return res.sendStatus(400);
        }

        const turma = await turmas.findAll({
            raw: true,
            attributes: ['ID', 'Nome', 'Inicio', 'Fim']
        });
        const declaracoe = await formulario.findAll({
            raw: true,
            attributes: ['ID', 'Nome', 'Inicio', 'IdAdmConferiu'],
        });

        if (user.Master == 0) {
            const id = user.EDV;
            const declaracoe = await formulario.findAll({
                raw: true,
                attributes: ['ID', 'Nome', 'Inicio', 'IdAdmConferiu'],
                where: { ID: id }
            });
            res.cookie('edvLogado', edv);
            res.render('../views/declaracoes_adm', { turma, declaracoe, id });
        }
        else {
            res.cookie('edvLogado', edv);
            res.render('home_adm_master', { edvLogado: edv });
        }
    }

    // ^^-----------------------------------------------------------------------------------------------------------------------------------------







}
