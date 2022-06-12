const express = require('express');
const Paciente = require('../models/Paciente');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const sugestoes = require('../models/Sugestoes');
const adminAuth = require('../middleware/adminAuth')
const router = express.Router();

router.get('/', (req, res) => {
    res.render('login');
});

router.get('/admin', (req, res) => {
    res.render('admin', { id: req.session.user.id, nome: req.session.user.nome })
    
})


//Autenticação
router.post('/authenticate', (req, res) => {
    let email = req.body.lemail;
    let senha = req.body.lsenha;

    Paciente.findOne({ where: { email } }).then(user => {
        if (user != undefined) {
            let correct = bcrypt.compareSync(senha, user.senha)

            if (correct) {
                req.session.user = {
                    id: user.id,
                    nome: user.nome,
                    email: user.email,
                    superuser: user.superuser
                }
                if (user.superuser === 'true') {

                    Paciente.findAll({ raw: true }).then((user) => {
                        res.render('superUser', {users: user.nome  }); 
                    });  

                } else {
                    res.render('admin', { id: req.session.user.id, nome: req.session.user.nome }); //Lembrar de enviar para a pagina de escolha;
                }

            } else {
                res.send("<script>alert('Senha inválida'); window.location.href = '/'; </script>");
            }

        } else {
            res.send("<script>alert('E-mail inválido'); window.location.href = '/'; </script>");
        }
    });

   
});



router.get('/perfil/:id', adminAuth.authenticate, (req, res) => {

    let id = req.params.id

    if (isNaN(id)) {
        res.redirect('/admin');
    } else {

        Paciente.findByPk(id).then(user => {
            if (user != undefined) {
                res.render('editUser', { user: user });
            } else {
                res.redirect('/admin');
            }
        }).catch(() => {
            res.redirect('/admin');
        })
    }

})

router.post('/atualizar', (req, res) => {
    let id = req.body.id;
    let nome = req.body.nome;
    let email = req.body.email;
    let endereco = req.body.endereco;
    let cidade = req.body.cidade;
    let estado = req.body.estado;

    Paciente.update({
        nome: nome,
        email: email,
        endereco: endereco,
        cidade: cidade,
        estado: estado
    }, {
        where: {
            id: id
        }
    }).then(() => {
        res.send("<script>alert('Perfil atualizado'); window.location.href = '/admin'; </script>");
    }).catch(() => {
        res.send("<script>alert('Erro ao atualizar perfil'); window.location.href = '/admin'; </script>");
    })
})

router.get('/agendamento', (req, res) => {
    res.render('agendamento')
})

//Logout
router.get('/logout', (req, res) => {
    req.session.user = undefined;
    res.redirect('/');
})

module.exports = router;