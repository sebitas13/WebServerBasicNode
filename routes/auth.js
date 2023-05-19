const express = require('express');
const { validarCampos } = require('../middlewares/validador-campos');
const {login} = require('../controllers/auth');
const { check } = require('express-validator');


const router = express.Router();

router.post('/login',[
    check('correo','El correo es obligatorio').isEmail(),
    check('password','El password es obligatorio').isLength({min : 3}),
    validarCampos
],login);


module.exports =  router
