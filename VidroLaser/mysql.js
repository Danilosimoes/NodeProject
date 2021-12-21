var mysql = require('mysql');
require('dotenv/config');


var pool = mysql.createPool({
    "user": process.env.MYSQL_USER,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOST,
    "port": process.env.MYSQL_PORT,


    
});


 



exports.pool = pool;