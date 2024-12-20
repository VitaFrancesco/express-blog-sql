const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'd3v_b0mF',
    database: 'db_blog'
})

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
})

module.exports = connection;