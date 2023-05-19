const {Schema,model} = require('mongoose');
const validator = require('validator');

const UsuarioSchema = Schema({
    nombre : {
        type : String,
        required : [true,'Name is required']
    },
    correo : {
        type : String,
        required : [true,'Correo is required'],
        unique : true,
        lowercase : true,
        validate : (value) =>{
            return validator.isEmail(value)
        }
    },
    password: {
        type : String,
        required : [true,'Password is required']
       
    },
    img : {
        type : String,
        
    },

    rol : {
        type : String,
        required : true,
       // enum : ['ADMIN_ROLE','USER_ROLE']
    },

    estado : {
        type : Boolean,
        default : true,
    },

    google : {
        type : Boolean,
        default : false
    }


})


UsuarioSchema.methods.getInitials = function() {
    return this.nombre[0] + this.correo[0]
}

UsuarioSchema.methods.toJSON = function(){
    const {__v,password,_id,...usuario} = this.toObject(); //Devuelve todo menos _v , password y _id
    usuario.uid = _id;
    return usuario
}



module.exports = model('Usuario',UsuarioSchema);