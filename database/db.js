const  mysql  = require('mysql2')

const connection = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: 'usbw',
    database: 'videolocadora',
})

module.exports = connection;

