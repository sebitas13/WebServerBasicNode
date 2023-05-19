const validaCampos = require('../middlewares/validador-campos');
const validaJWT = require('../middlewares/validator-jwt')
const validaRoles = require('../middlewares/validator-roles')



module.exports = {
    ...validaCampos,
    ...validaJWT,
    ...validaRoles
}