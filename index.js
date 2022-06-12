
//express
const express = require('express');
const app = express();
const session = require('express-session');
const http = require('http').createServer(app);

//Socket.io
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000/",
        methods: ["GET", "POST"],
      }
});

//Criando evento de chat
io.on('connection', socket => {

    socket.on("disconnect", () => {
        console.log('X Desconectou: ' + socket.id)
    });

    socket.on("msg", data => {
        io.emit("showmsg", data);
        console.log(data)
    })

});
//controllers
const userController = require('./controllers/userController');
const cadastroController = require('./controllers/cadastroController');
const meetingController = require('./controllers/mettingController');
const liveChatController = require('./controllers/liveChatController');
const adminController = require('./controllers/adminController');
const sugestoesController = require('./controllers/sugestoesController');
const AgendaMedicosController = require('./controllers/AgendaMedicosController');






//view engine
app.set('view engine', 'ejs', {


});

//Session config.
app.use(session({
    secret: "umtextoqualquerparaaumentarasegurancadassessoes",
    cookie: { maxAge: 900000000 }
}))

//Informando ao express para utilizar a pasta public para arquivos estaticos
app.use(express.static('public'));

//traduzindo dados
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//rotas
app.use('/', userController);
app.use('/', cadastroController);
app.use('/', meetingController);
app.use('/', liveChatController);
app.use('/', adminController);
app.use('/', sugestoesController);
app.use('/', AgendaMedicosController);





//Servidor
http.listen(3000, () => console.log('servidor ON'));