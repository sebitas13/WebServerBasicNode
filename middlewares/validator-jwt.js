
const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');


const validarJWT = async (req=request,res=response,next) => {
    const token = req.header('Key-zen');

    if(!token){
        return res.status(401).json({msg : 'Token undefined'});
    }

    try {
        const payload = jwt.verify(token,process.env.SECRETORPRIVATEKEY);

        //Lectura del usuario que corresponde al uid
        
        const uid = payload.uid;
        const userAuthentified = await Usuario.findOne({_id:uid});

        if(!userAuthentified){
            return res.status(401).json({mgs:'User does not exist in the DB'});
        }

        if(!userAuthentified.estado){
            return res.status(401).json({mgs:'User state: false'});
        }

        req.usuario = userAuthentified
        console.log('token valido');
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({msg : 'Token not valid'});
    }

    
}



module.exports = {
    validarJWT
}