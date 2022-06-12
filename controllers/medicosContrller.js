const express = require('express');
const Paciente = require('../models/Paciente');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const adminAuth = require('../middleware/adminAuth')
const router = express.Router();

router.get('/', (req, res) => {
    res.render('login');
});

router.get('/medicos', (req, res) => {
    res.render('medicos');
});

router.get('/admin', (req, res) => {
    res.render('admin', { id: req.session.user.id, nome: req.session.user.nome })
    
})



//Autenticação
router.post('/authenticatte', (req, res) => {
    let email = req.body.lemail;
    let senha = req.body.lsenha;

    Paciente.findOne({ where: { email } }).then(medico => {
        if (medico != undefined) {
            let correct = bcrypt.compareSync(senha, medico.senha)

            if (correct) {
                req.session.medico = {
                    id: medico.id,
                    nome: medico.nome,
                    email: medico.email,
                    medicos: medico.medicos
                }
                if (medico.medicos === 'verdade') {

                    Paciente.findAll({ raw: true }).then((medico) => {
                        res.render('medicos', {users: medico.nome  }); 
                    });  

                } else {
                    res.render('medicos', { id: req.session.medico.id, nome: req.session.medico.nome }); //Lembrar de enviar para a pagina de escolha;
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
        res.redirect('/medicos');
    } else {

        Paciente.findByPk(id).then(user => {
            if (user != undefined) {
                res.render('editUser', { user: user });
            } else {
                res.redirect('/medicos');
            }
        }).catch(() => {
            res.redirect('/medicos');
        })
    }

})

//Logout
router.get('/logout', (req, res) => {
    req.session.user = undefined;
    res.redirect('/');
})

module.exports = router;