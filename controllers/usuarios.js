const {response,query} = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');


const usuarioGet = async (req=query,res=response)=>{
   // const {nombre ="unnamed",key,limit=2} = req.query;

   const {limite=5 , desde = 0}  = req.query;
   const query = {estado : true};

//    const usuarios = await Usuario
//    .find(query)
//    .limit(limite)
//    .skip(desde);

//    const total = await Usuario
//    .countDocuments(query);

    const [total,usuarios] = await Promise.all([
            Usuario.countDocuments(query),
            Usuario.find(query)
            .limit(limite)
            .skip(desde)
    ])

    res.json({
        total,
        usuarios
    });
}

const usuarioPost = async (req,res=response)=>{

    

    const {nombre,correo,password,rol} = req.body;


    const usuario = new Usuario({
        nombre, //Es lo mismo de nombre : nombre
        correo,
        password,
        rol
    });
    //Verficar correo

    
    
    //probando un metodo
    let iniciales = usuario.getInitials();
    console.log(iniciales);


    

    //Encriptado de contraseña
    const salt = bcrypt.genSaltSync(); //Por defecto esta en 10, para una encriptacion mayor aumentar 
    usuario.password = bcrypt.hashSync(password,salt);

    usuario.save();

    res.json({
        msg : 'un post - controlador',
        usuario
    });
}

const usuarioPut = async (req,res=response)=>{

    const {id} = req.params;
    const {_id,google,correo,password,...resto} = req.body;

    if(password){
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password,salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto);
    

    res.json( 
        usuario
    );
}

const usuarioDelete = async (req,res=response)=>{
    const {id} = req.params;

    //Borrado fisico , no recomendado
    //const usuario = await Usuario.findByIdAndDelete(id);

    //Borrado logico para conservar la integridad referencial
    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});

    const usuarioAuthentified = req.usuario;

    

    
    res.json(
        {usuario,
        usuarioAuthentified}
    );
}



module.exports = {
    usuarioGet,
    usuarioDelete,
    usuarioPost,
    usuarioPut
}