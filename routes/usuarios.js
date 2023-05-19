const express = require('express');

const { check } = require('express-validator');

const {isAdminRole,
        tieneRole,
        validarCampos,
        validarJWT} = require('../middlewares/');

const { usuarioGet,
        usuarioDelete, 
        usuarioPut,
        usuarioPost} = require('../controllers/usuarios');

const {validarRoles,
        existeCorreo,
        existeIDenMongo}= require('../helpers/bd_validation');



const router = express.Router();


router.get('/',usuarioGet);

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('correo','Correo no valido').isEmail(),
    check('password','Password debe tener mas de 2 letras').isLength({min : 3}),
    //check('rol','No es un rothis.validarRolesl definido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( validarRoles),
    check('correo').custom( existeCorreo),
    validarCampos    //Luego de la validaciones , se ejecuta este middleware
],usuarioPost);

router.put('/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeIDenMongo),
    check('rol').custom(validarRoles),
    validarCampos
],usuarioPut);


router.delete('/:id',[
    validarJWT,
    isAdminRole, //Fuerza que sea administrador
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'), //Podemos enviar argumentos en los middlewares
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeIDenMongo),
    validarCampos
],usuarioDelete);



module.exports =  router