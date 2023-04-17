
const  {model,Schema} = require('mongoose');

const roleSchema = Schema({
    rol : {
        type : String,
        required : [true,"el rol es importante"]
    }
});


module.exports = model('Role',roleSchema);
