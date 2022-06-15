const express = require('express');
const router = express.Router();
const AgendaMedicos = require('../models/AgendaMedicos');
const Paciente = require('../models/Paciente');
const Horarios = require('../models/Horarios');
const session = require('express-session');
const adminAuth = require('../middleware/adminAuth')
const Consulta = require('../models/Consulta');
const { Op } = require("sequelize");


router.post('/agendalist', (req, res) => {
    let id = req.body.idmedic;
    

    Paciente.findByPk(id).then((profissionais) => {
        Horarios.findAll({ raw: true}).then((horarios) => {
            for(let i=1; i < 7; i++){
                horarios.forEach(horario=>{
                    var today=new Date()
                    let datali = today.getDate()+i+'/0'+(today.getMonth()+1)+'/'+today.getFullYear();
                    today.getDate()+i+' /0'+(today.getMonth()+1)+'/'+today.getFullYear();
                    Consulta.findOne({ raw : true , where : {
                        datamarc: datali,
                        horaini: horario.horaINI,
                        horafim: horario.horaFIM,
                        idprofissional: id
                    }}).then((consultas) => {
                        if(consultas){

                        }else{
                            Consulta.create({
                                datamarc: datali,
                                horaini: horario.horaINI,
                                horafim: horario.horaFIM,
                                status: "D",
                                idprofissional: id
                            })
                        }

                    })
                    

                })}

            Consulta.findAll({ raw: true ,  where : { idprofissional : id, status: "D" }}).then((consultas) => {
                res.render('agenda', { profissionais: profissionais, id: req.session.user.id, consultas : consultas});
            })
        }).catch((err) => {
            res.send('<script> alert("Não foi encontrados horarios cadastrados"); window.location.href = "/admin"</script>');
        });

    }).catch((err) => {
        res.send('<script> alert("Não foi encontrar a agenda do profissional!"); window.location.href = "/admin"</script>');
    });
})


router.post('/desmarcarconsulta', (req, res) => {
    let idpaciente = req.body.idpaciente;
    let idconsulta = req.body.idconsulta;
    let idmedic = req.body.idmedic;
    let data = req.body.data;
    let hrini = req.body.hrini;
    let hrfim = req.body.hrfim;
    
    Consulta.update({
        status: 'D',
        idpaciente: null
    }, {
        where: {
            id: idconsulta
        }
    }).then(() => {
        res.send("<script>alert('Consulta desmarcada com sucesso'); window.location.href = '/admin'; </script>");
    }).catch(() => {
        
        res.send('<script> alert("Não foi possivel desmarcar sua consulta"); window.location.href = "/admin"</script>');
    })
   
})

router.post('/agendaconsulta', (req, res) => {
    let idpaciente = req.body.idpaciente;
    let idmedic = req.body.idmedic;
    let data = req.body.data;
    let hrini = req.body.hrini;
    let hrfim = req.body.hrfim;
    
    Consulta.update({
        datamarc: data,
        horaini: hrini,
        horafim: hrfim,
        status: "M",
        idprofissional: idmedic,
        idpaciente: idpaciente
    }, {
        where: {
            datamarc: data,
            horaini: hrini,
            horafim: hrfim,
            idprofissional: idmedic,
        }
    }).then(() => {
        res.send("<script>alert('Consulta agendada com sucesso'); window.location.href = '/admin'; </script>");
    }).catch(() => {
        res.send('<script> alert("Não foi possivel marcar sua consulta"); window.location.href = "/admin"</script>');
    })
   
})

router.get('/horarios', (req, res) => {
    res.render('horarios');
});

router.post('/sethorarios', (req, res) => {
    let horaini = req.body.horaini;
    let horafim = req.body.horafim;
    Horarios.create({
        horaINI: horaini,
        horaFIM: horafim,
    }).then(() => {
        res.send("<script>alert('Horário cadastrado com sucesso'); window.location.href = '/indexAdmin'; </script>");
    }).catch(() => {
        res.send('<script> alert("Não foi possivel cadastrar o horário"); window.location.href = "/indexAdmin"</script>');
    })
   
})


router.get('/minhasconsultas', (req, res) => {
    let id = req.session.user.id;
    //Paciente.findOne({ raw: true, where: {id: id, [Op.or]: [ {crm: {[ Op.ne]:null, [Op.ne]:''}},{cfp: {[ Op.ne]:null, [Op.ne]:''}}]}}).then((profissionais) => {
    Paciente.findOne({ raw: true, where: {id: id}}).then((profissionais) => {
                if(profissionais){
                    Consulta.findAll({ raw : true , where : { [Op.or]: [{idpaciente : id},{idprofissional : id}],
                        status: 'M',
                    }}).then((consultas) => {
                        res.render('minhasconsultas',{consultas : consultas, profissionais:profissionais, id:req.session.user.id})
                    }).catch(() => {
                        res.send('<script> alert("Não há consultas marcadas"); window.location.href = "/admin"</script>');
                    })

                }else{
                   
                }
            });

    

})


module.exports = router;