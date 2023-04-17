const Role = require('../models/role');
const Usuario = require('../models/usuario');

const validarRoles = async (rol='') => {
    
    const  existeRole = await Role.findOne({rol : rol});
          if(!existeRole){
              throw new Error(`El rol ${rol} no esta identificado en la BD`);
          }
}

const existeCorreo = async(correo='') =>{
    const existeCorreo = await Usuario.findOne({correo:correo});
    if(existeCorreo){
        throw new Error(`El correo ${correo} ya existe en la BD`);
        //return res.status(400).json({msg :'El correo ya existe'});
    }
}

const existeIDenMongo = async(id) =>{
    const existeid = await Usuario.findById(id);
    if(!existeid){
        throw new Error(`El id ${id} no existe en la BD`);
        //return res.status(400).json({msg :'El correo ya existe'});
    }
}


module.exports = {
    validarRoles,
    existeCorreo,
    existeIDenMongo
}