var mysql = require('mysql2');

var conn = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Tnc2024@',
    database: 'TNC'
});

conn.connect(function(err) {
    if(err){
        console.error('Error connecting to Db:', err);
        return;
    }else{
        console.log('Connected to the database!');
    }
});

module.exports = conn;