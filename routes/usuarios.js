const express = require('express');
const router = express.Router();
const {usuarioGet,usuarioDelete, usuarioPut,usuarioPost} = require('../controllers/usuarios');

router.get('/',usuarioGet);
router.post('/',usuarioPost);
router.put('/:id',usuarioPut);
router.delete('/',usuarioDelete);



module.exports = {
    router
}