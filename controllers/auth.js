const bcryptjs = require('bcryptjs');

const { response } = require("express");
const {generarJWT} = require("../helpers/generar-jwt")
const Usuario = require('../models/usuario');


const login = async (req,res=response) =>{

    const {correo,password} = req.body;

    try {

        //Verificar si email existe
        const usuario = await Usuario.findOne({correo:correo});
        if(!usuario){
            return res.status(400).json({msg:'Wrong email'})
        }

        //Si el usuario esta activo

        if(!usuario.estado){
            return res.status(400).json({msg:'state :false'})
        }
        //Verificar la contraseña

        const validPassword = bcryptjs.compareSync(password,usuario.password);
        if(!validPassword){
            return res.status(400).json({msg:'Invalid password'})
        }

        //Generar JWT 
        const token = await generarJWT(usuario.id);
        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg : "Error, comuniquese con el administrador"
        })
    }


    
}


module.exports = {
    login 
}