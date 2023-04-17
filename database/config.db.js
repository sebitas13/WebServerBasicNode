const mongoose = require('mongoose');
require('dotenv').config();

//Version con una clase
class DataBase{
    constructor(){
        this._conexion();
    }

    _conexion(){
        mongoose.set('strictQuery', false);
        mongoose.connect(process.env.MONGODB_ATLAS,{ })
        .then(()=>{
            console.log('Database connection successful');
        })
        .catch((err)=>{
            console.log('Database connection error');
        });
    }
}

//Version con una funcion
const conexion = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_ATLAS); 
    } catch (error) {
        console.log('error: ',error);
        throw new Error('Error en la conexion DB');
    }

    console.log('Base de datos onnline');

    // {userNewUrlParser:true,
    //     useUnifiedTopology : true,
    //     useCreateIndex : true,
    //     useFindAndModify : false}
}


module.exports = {
    dataBase :new DataBase(),
    conexion : conexion
}