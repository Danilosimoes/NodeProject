const express = require ('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const rotaFuncionarios = require('./routes/funcionarios');
const rotaCars = require('./routes/cars');
const rotaUsuarios = require('./routes/usuarios');
const rotaObras = require('./routes/obras');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true})); //apenas dados simples
app.use(bodyParser.json()); //json de entrada no body
app.use(express.json());

app.use('*',(req, res, next) => {
    res.header('Acess-Control-Allow-Origin', '*');
    res.setHeader(
        'Acess-Control-Allow-Header',
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'Authorization'
    );
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "PUT", "POST, GET, DELETE");
    res.setHeader("Access-Control-Max-Age", "3600");
    res.setHeader("Access-Control-Allow-Headers", "x-requested-with", "content-type");
    res.setHeader('Acess-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    

    

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers", "Origin,Accept","Authorization", "X-Requested-With", "Content-Type", "Access-Control-Request-Method", "Access-Control-Request-Headers");
    app.use(cors());   
   
    //if(req.method === 'OPTIONS'){
        //return res.status(200).send({});
        
    //}
        


    next();

    
});




app.use('/funcionarios', rotaFuncionarios);
app.use('/cars', rotaCars);
app.use('/usuarios', rotaUsuarios);
app.use('/obras', rotaObras);

//Quando a rota nao for encontrada
app.use((req,use,next)=>{
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500)
    return res.send({
        erro:{
            mensagem: error.message
        }
    });
});




module.exports = app;

