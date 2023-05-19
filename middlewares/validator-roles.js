const { request, response } = require("express");


const isAdminRole = (req=request,res=response,next)=>{
    if(!req.usuario){
        return res.status(500).json({msg:'primero se valida el token...'});
    }

    const {rol,nombre} = req.usuario;
    if(rol!== 'ADMIN_ROLE'){
        return res.status(401).json({msg:'You must have the role of administrator'});

    }

    console.log('Es admin role');
    next();
}

const tieneRole = (...roles)=>{

    
    return (req,res=response,next) =>{

        if(!req.usuario){
            return res.status(500).json({msg:'primero se valida el token...'});
        }

        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({msg:`El servicio requiere uno de estos roles ${roles}`});
        }

        
        console.log(roles,req.usuario.rol);


        next();
    }
}


module.exports = {
    isAdminRole,
    tieneRole
}