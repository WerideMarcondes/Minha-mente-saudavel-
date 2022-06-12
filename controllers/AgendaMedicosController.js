const express = require('express');
const router = express.Router();
const AgendaMedicos = require('../models/AgendaMedicos');

router.get('/agenda', (req, res) => {
    res.render('agenda')

})


router.post('/criaragenda', (req, res) => {

    let Hora = req.body.hora
    let Data = req.body.data

    if (Hora !== undefined && Hora !== null && Hora!== '' && Data !== undefined && Data!== null && Data!== '') {
    

    AgendaMedicos.create({
        hora: Hora,
        data: Data
     }).then(() => {
        res.send("<script>alert('Agenda gerada Com succeso'); window.location.href = '/agenda'; </script>"); 
    }).catch((err) => {
        console.log("Não foi possivel envia a sua Sugestão" + err);
        res.send('<script> alert("Não foi possivel enviar sua sugestao!"); window.location.href = "/agenda"</script>');
    })}else {
        res.send('<script> alert("Não foi possivel Enviar sua agenda !"); window.location.href = "/agenda"</script>');
    }

})


 module.exports = router;