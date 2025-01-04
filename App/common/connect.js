var mysql = require('mysql2');

var conn = mysql.createConnection({
    host: '192.168.55.108',
    port: 3306,
    user: 'nghia',
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