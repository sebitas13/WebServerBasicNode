
const express = require('express');
const {router} = require('../routes/usuarios');
const {dataBase} = require('../database/config.db');

var cors = require('cors');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosRouterPatch  = '/api/usuarios';

        this.conexionDB();
        this.middlewares();
        this.routes();
    }

    conexionDB(){
        dataBase;
    }

    routes(){
        this.app.use(this.usuariosRouterPatch, router);
    }

    middlewares(){
        this.app.use(express.static('public')); // Carpeta publica
        this.app.use(cors());  //Cors
        this.app.use(express.json()); // Lectura y parseo del body
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`escuchando en el puerto ${this.port}`);
        })
    }
}




module.exports = {
    Server
}