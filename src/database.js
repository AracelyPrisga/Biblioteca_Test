// Objeto de conexion

//constante mysql

const mysql = require('mysql');

const myconnection= mysql.createConnection( {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'library'
});

myconnection.connect(function (err){
    if(err){
        console.log(err);
        return;
    }else{
        console.log("DataBase connected");
    }
});

// exportar para ocupar en otros modulos
module.exports = myconnection;
