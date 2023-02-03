const {response,query} = require('express');

const usuarioGet = (req=query,res=response)=>{
    const {nombre ="unnamed",key,limit=2} = req.query;

    res.json({
        msg : 'un get - controlador',
        nombre,
        key,
        limit
    });
}

const usuarioPost = (req,res=response)=>{

    const {name, edad} = req.body;

    res.json({
        msg : 'un post - controlador',
        name,edad
    });
}

const usuarioPut = (req,res=response)=>{

    const {id} = req.params;
    res.json({
        msg : 'un put - controlador',
        id
    });
}

const usuarioDelete = (req,res=response)=>{
    res.json({
        msg : 'un delete - controlador'
    });
}



module.exports = {
    usuarioGet,
    usuarioDelete,
    usuarioPost,
    usuarioPut
}