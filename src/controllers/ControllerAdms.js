var verificar = '';
const administrador = require('../model/Administrador');
const turmas = require('../model/Turma');
const formulario = require('../model/formulario');
//Cadastrar Adm


module.exports = {

    //acessar pagina declaracoes
    async getPagDeclaracoes(req, res) {

        const dados = req.cookies;
        const edvLogado = dados.edvLogado;
        const turma = await turmas.findAll({
            raw: true,
            attributes: ['ID', 'Nome', 'Inicio', 'Fim']
        });
        const declaracoe = await formulario.findAll({
            order: [
                ['Status', 'ASC'],
            ],
            raw: true,
            attributes: ['ID', 'Nome', 'Inicio', 'IdAdmConferiu', 'Fim', 'Descricao', 'Arquivo', 'IdTurma', 'EDV', 'Status'],

        });

        res.cookie('edvAdm', edvLogado);
        const edvAdm = req.cookies.edvAdm;

        res.render('../views/declaracoes_adm', { turma, id: '', declaracoe, edvAdm });
    },


    async download(req, res) {
        const caminhoFOTO = req.query.arq;
        var path = require('path');
        var file = path.join(__dirname, '../../public/img/' + caminhoFOTO);
        res.download(file)
    },


    // ^^-----------------------------------------------------------------------------------------------------------------------------------------

    // acessar pag declaracoes conforme turma escolhida
    async postPagDeclaracoes(req, res) {
        //colocar o objeto que vc quer procurar

        const status = req.body.situacao;
        const id = req.body.turma;
        const edvAdm = req.cookies.edvAdm;


        if (status & id) {
            const declaracoe = await formulario.findAll({
                order: [
                    ['Status', 'ASC'],
                ],
                raw: true,
                attributes: ['ID', 'Nome', 'Inicio', 'IdAdmConferiu', 'EDV', 'IdTurma', 'Fim', 'Descricao', 'Arquivo', 'Status'],
                where: {
                    IdTurma: id,
                    Status: status
                }
            });

            const turma = await turmas.findAll({ attributes: ['ID', 'Nome'] });
            res.cookie('edvAdm', edvAdm);

            res.render('../views/declaracoes_adm', { turma, declaracoe, id, status, edvAdm });
        }
        else if (status) {
            const declaracoe = await formulario.findAll({
                order: [
                    ['Status', 'ASC'],
                ],
                raw: true,
                attributes: ['ID', 'Nome', 'Inicio', 'IdAdmConferiu', 'EDV', 'IdTurma', 'Fim', 'Descricao', 'Arquivo', 'Status'],
                where: {
                    Status: status
                }
            });

            res.cookie('edvAdm', edvAdm);
            const turma = await turmas.findAll({ attributes: ['ID', 'Nome'] });
            res.render('../views/declaracoes_adm', { turma, declaracoe, id, status, edvAdm });
        }

        else if (id) {
            const declaracoe = await formulario.findAll({
                order: [
                    ['Status', 'ASC'],
                ],
                raw: true,
                attributes: ['ID', 'Nome', 'Inicio', 'IdAdmConferiu', 'EDV', 'IdTurma', 'Fim', 'Descricao', 'Arquivo', 'Status'],
                where: {
                    IdTurma: id
                }
            });
            res.cookie('edvAdm', edvAdm);

            const turma = await turmas.findAll({ attributes: ['ID', 'Nome'] });
            res.render('../views/declaracoes_adm', {
                turma, declaracoe, id, status, edvAdm
            });

        }

        else {
            const declaracoe = await formulario.findAll({
                order: [
                    ['Status', 'ASC'],
                ],
                raw: true,
                attributes: ['ID', 'Nome', 'Inicio', 'IdAdmConferiu', 'EDV', 'IdTurma', 'Fim', 'Descricao', 'Arquivo','Status'],
            },
            );
            res.cookie('edvAdm', edvAdm);
            const turma = await turmas.findAll({ attributes: ['ID', 'Nome'] });
            res.render('../views/declaracoes_adm', { turma, declaracoe, id: '', status: '', edvAdm });

        }
    },


    //aceitar declaracao
    async PostAceitarDeclaracao(req, res) {
        const dados = req.body;
        const id = dados.id;
        const idR = dados.idR;

        // Dando upgrade nas novas informações
        if (idR) {
            await formulario.update({
                IdAdmConferiu: req.cookies.edvAdm,
                Status: 2
            },
                {
                    where: { ID: idR },
                });

            res.cookie('edvAdm', req.cookies.edvAdm);
            res.redirect('/declaracoes/');
        }
        else if (id) {
            await formulario.update({
                IdAdmConferiu: req.cookies.edvAdm,
                Status: 1
            },
                {
                    where: { ID: id },
                });
            res.cookie('edvAdm', req.cookies.edvAdm);
            res.redirect('/declaracoes/');
        }



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

        res.render('../views/login-adm', { verificar })
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
        console.log(dados)
        const edv = dados.edv;
        const senha = dados.senha;
        const user = await administrador.findOne({ where: { edv } });
        const turma = await turmas.findAll({
            raw: true,
            attributes: ['ID', 'Nome', 'Inicio', 'Fim']
        });
        const declaracoe = await formulario.findAll({
            raw: true,
            attributes: ['ID', 'Nome', 'Inicio', 'IdAdmConferiu'],
        });

        if (user == null || user.Senha != senha || user.Ativo == 0) {
            verificar = '0'
            return res.render('../views/login-adm', { verificar });
        }


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
