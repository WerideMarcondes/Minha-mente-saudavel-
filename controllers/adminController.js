const express = require('express');
const router = express.Router();
const sugestoes = require('../models/Sugestoes');
const Paciente = require('../models/Paciente');
var nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const { render } = require('ejs');
const { Op } = require("sequelize");


router.get('/marcarConsulta',(req, res) =>{
    Paciente.findAll({ raw: true, where: {crm: {
        [Op.ne]: null,  [Op.ne]: ''}}}).then((medicos) => {
            Paciente.findAll({ raw: true, where: {cfp: {
                [Op.ne]: null,  [Op.ne]: '' }}}).then((psicologos) => {
                    res.render('agendamento', {medicos: medicos, psicologos: psicologos}); 
            }) 
    });  
})


router.get('/novasenha', (req, res) => {
        res.render('novasenha')

})

router.get('/indexAdmin', (req, res) => {

    sugestoes.findAll({ raw: true }).then((sugestoes) => {
        res.render('indexAdmin', {sugestoes: sugestoes,}); 
    });  

})

router.get('/usuarios', (req, res) => {

    Paciente.findAll({ raw: true }).then(users => {
        res.render('usuarios', { users: users })
    })
  

})

router.post('/finduser', (req, res) =>{
    let email = req.session.user.email;

    Paciente.findOne({raw: true, where:{email: email}}).then(founduser =>{  
        if (!founduser) {
            res.send('<script>alert("Usuário não encontrado"); window.location.href = "/indexAdmin"</script>');
        } else {
            res.render('foundusuario', {user: founduser} )
        }
    })
})


router.get('/edit/:id', (req, res) =>{
    let id = req.params.id;
    
    if(isNaN(id)){
        res.redirect('/usuarios')
    } else {
        Paciente.findByPk(id).then(user => {
            if(user != undefined) {
                res.status(200);
                res.render('adminEditUser', { user: user })
            } else {
                res.status(400);
                res.redirect('/usuarios')
            }
        }).catch(() => {
            res.status(400);
            res.redirect('/usuarios')
        })
    }
})

router.post('/update', (req, res) => {
    let id = req.body.id;
    let nome = req.body.nome;
    let email = req.body.email;
    let endereco = req.body.endereco;
    let cidade = req.body.cidade;
    let estado = req.body.estado;
    let superuser = req.body.superuser;

    Paciente.update({ nome, email, endereco, cidade, estado, superuser }, {
        where:{
            id: id
        }
    }).then(() => {
        res.status(200);
        res.send('<script>alert("Usuário atualizado!"); window.location.href = "/usuarios"</script>');
    }).catch(() => {
        res.status(400);
        res.send('<script>alert("Usuário inválido!"); window.location.href = "/usuarios"</script>');
    })
})

router.post('/delete', (req, res) => {
    let id = req.body.id;
    
    if(id != undefined) {

        if(!isNaN(id)) {

            Paciente.destroy({
                where:{
                    id: id
                }
            }).then(() => {
                res.status(200);
                res.send('<script>alert("Usuário deletado!"); window.location.href = "/usuarios"</script>');    
            }).catch(() => {
                res.status(404);
                res.send('<script>alert("Usuário inválido!"); window.location.href = "/usuarios"</script>');
            })
        }

    } else {
        res.status(404);
        res.send('<script>alert("Usuário inválido!"); window.location.href = "/usuarios"</script>');
    
    }

})


router.post('/deleteuserself', (req, res) => {
    let id = req.body.id;
    
    if(id != undefined) {

        if(!isNaN(id)) {

            Paciente.destroy({
                where:{
                    id: id
                }
            }).then(() => {
                res.status(200);
                res.send('<script>alert("Usuário deletado!"); window.location.href = "/"</script>');    
            }).catch(() => {
                res.status(404);
                res.send('<script>alert("Usuário inválido!"); window.location.href = "/"</script>');
            })
        }

    } else {
        res.status(404);
        res.send('<script>alert("Usuário inválido!"); window.location.href = "/"</script>');
    
    }

})

router.post('/deleteSugestoes', (req, res) => {
    let Id = req.body.id;

if(Id != undefined) {

    if(!isNaN(Id)) {

        sugestoes.destroy({
            where:{
                id: Id
            }
        }).then(() => {
           
            res.send('<script>alert("Sugestão removida!"); window.location.href = "/indexAdmin"</script>');  
        }).catch(() => {
            res.status(404);
            res.send('<script>alert("Não existe suegstão!"); window.location.href = "/indexAdmin"</script>');
        })
    }

} else {
    res.status(404);
    res.send('<script>alert("Não existe suegstão!"); window.location.href = "/indexAdmin"</script>');

}
})

router.post('/trocarsenha', (req, res) => {
    let email = req.session.email;
    let pin = req.body.pin;

    Paciente.findOne({ raw: true, where: {
        email:email,
        pin: pin
     } }).then(user => {
         console.log(user)
        if (user ){
            res.send('<script> alert("PIN validado com sucesso!"); window.location.href = "/psswd"</script>');
        } else{
            res.send('<script> alert("E-mail não Cadastrado ou PIN invalido!"); window.location.href = "/novasenha"</script>');

        }

}).catch(() => {
    res.send('<script> alert("PIN incorreto, tente novamente!"); window.location.href = "/novasenha"</script>');
});
});

router.get('/psswd', (req, res) => {
    res.render('psswd');
});

router.get('/pinuser', (req, res) => {
    res.render('pinuser');
});


router.post('/setsenha', (req, res) => {
    let email = req.session.email;
    let senha = req.body.senha;
    let confirmSenha = req.body.confirmSenha;
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(senha, salt);

    if(senha === confirmSenha){
        Paciente.update({
            senha: hash
        }, {
            where: {
                email: email
            }
        }).then(() => {
            res.send('<script> alert("Senha alterada com sucesso!"); window.location.href = "/"</script>');
        }).catch(() => {
            res.send('<script> alert("Seus Dados estão incorretos !"); window.location.href = "/novasenha"</script>');
        })
    }
    else{
        res.send('<script> alert("Digite senhas iguais"); window.location.href = "/novasenha"</script>');
    }
    

  
});

router.post('/novasenha', (req, res) => {
    let email = req.body.email;
    req.session.email = email;
    let pin = Math.floor(Math.random() * 999999 + 1);
    Paciente.update({
        pin: pin,
    }, {
        where: {
            email: email
        }
    }).then(user => {
        req.session.id = user.id;
        var remetente = nodemailer.createTransport({
            host: '',    
            service: 'gmail',    
            port: 587,    
            secure: true,    
            auth:{    
            user: 'mentesaudavelreset@gmail.com',    
            pass: 'kgkojeafwzxbpiqw' }
            });
            
        var emailASerEnviado = {
            from: 'mentesaudavelreset@gmail.com',
            to: email,
            subject:'PIN Para Reset De Senha Mente Saudavel',
            text: `Segue seu PIN: ${pin}`,
            };
        
        remetente.sendMail(emailASerEnviado, function(error){
            if (error) {
                console.log(error);
                } else {
                    res.send("<script>alert('Seu PIN Foi enviado ao E-mail informado...'); window.location.href = '/pinuser'; </script>");
                }
                });
        
    }).catch(() => {
        res.send("<script>alert('O E-mail informado esta correto?'); window.location.href = '/novasenha'; </script>");
    })


});



module.exports = router;