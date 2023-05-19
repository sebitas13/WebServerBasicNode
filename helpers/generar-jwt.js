const jwt  = require('jsonwebtoken');


const generarJWT = async (uid='') =>{
    const payload = {uid};
    const token = jwt.sign(payload,process.env.SECRETORPRIVATEKEY,{
        expiresIn : '24h'
    })
    return token;
}



module.exports = {
    generarJWT
}