const administrador = require('../model/Administrador');
const turmas = require('../model/Turma')
const formulario = require('../model/formulario')
//Cadastrar Adm


module.exports = {

    //acessar pagina declaracoes
    async getPagDeclaracoes(req, res) {
        const edvLogado = req.body.edvLogado;
        console.log(edvLogado)
        const turma = await turmas.findAll({
            raw: true,
            attributes: ['ID', 'Nome', 'Inicio', 'Fim']
        });
        const declaracoe = await formulario.findAll({
            raw: true,
            attributes: ['ID', 'Nome', 'Inicio', 'IdAdmConferiu'],
        });
        res.render('../views/declaracoes_adm', { turma, id: '', declaracoe, edvLogado });
    },

    async PostAceitarDeclaracao(req, res)
    {
        const edvLogado = req.body.edvLogado;
        const id = req.body.id;

        const turma = await turmas.findAll({
            raw: true,
            attributes: ['ID', 'Nome', 'Inicio', 'Fim']
        });
        const declaracoe = await formulario.findAll({
            raw: true,
            attributes: ['ID', 'Nome', 'Inicio', 'IdAdmConferiu'],
        });

        console.log(id)
        await formulario.update({
            IdAdmConferiu: edvLogado,
        },
            {
                where: { ID: id }
            });

        res.render('../views/declaracoes_adm', { turma, id: '', declaracoe, edvLogado });
    },
    

    // ^^-----------------------------------------------------------------------------------------------------------------------------------------

    //acessar pag declaracoes conforme turma escolhida
    async postPagDeclaracoes(req, res) {
        //colocar o objeto que vc quer procurar
        const edvLogado = req.body.edvLogado;
        const id = req.body.turma;
        console.log(id)
        const declaracoe = await formulario.findAll({
            raw: true,
            attributes: ['ID', 'Nome', 'Inicio', 'IdAdmConferiu'],
            where: { IdTurma: id }
        })
        const turma = await turmas.findAll({ attributes: ['ID', 'Nome']})


        res.render('../views/declaracoes_adm', { turma, declaracoe, id, edvLogado });
    },

    // ^^-----------------------------------------------------------------------------------------------------------------------------------------

    //direcionar para pagina que verifica adm (aceita/edita adm)
    async getAceiteAdm(req, res) {

        const administradores = await administrador.findAll({
            raw: true,
            attributes: ['EDV', 'Nome', 'Ativo'],
        });

        res.render('../views/usuarios_adm', { administradores });
    },


    // ^^-----------------------------------------------------------------------------------------------------------------------------------------

    //aceitar adm (liberar master ou nao)
    async postAceiteAdm(req, res) {

        console.log(req.body)

        const dados = req.body;
        const edv = req.body.edv;
        const edvR = req.body.edvR;

        const administradores = await administrador.findAll({
            raw: true,
            attributes: ['EDV', 'Nome'],
           
        });

        if (edvR) {
            administrador.destroy(
                {
                    where: { EDV: edvR }
                });

            return res.render('../views/usuarios_adm', { administradores });

        }
        await administrador.update({
            Master: dados.master,
            Ativo: true
        },
            {
                where: { EDV: edv }
            });

        res.render('../views/usuarios_adm', { administradores });

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
            attributes: ['EDV', 'Nome'],
            where: { Ativo: 0 }
        })
        res.render('../views/usuarios_adm', { administradores })
    },

    // ^^-----------------------------------------------------------------------------------------------------------------------------------------

    //verifica se o login é valido 
    async verificaLogin(req, res) {

        console.log(req.query)

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
            const declaracoes = await formulario.findAll({
                raw: true,
                attributes: ['ID', 'Nome', 'Inicio', 'IdAdmConferiu'],
                where: { ID: id }
            })
            res.render('../views/declaracoes_adm', { turma, declaracoe, id });
        }
        else {
            res.render('home_adm_master', { edvLogado: edv });
        }
    }

    // ^^-----------------------------------------------------------------------------------------------------------------------------------------







}
