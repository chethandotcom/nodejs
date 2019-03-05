'use strict';

// Getting the mysql driver
var mysql = require('mysql');

// Creating the connection pool to handle the requests
var pool = mysql.createPool({
    connectionLimit: 200,
    host: 'PATH_TO_DB',
    user: 'USER_NAME',
    password: 'PASSWORD',
    database: 'DB_NAME',
    port: 'PORT_NUM',
    debug: false
});

var dbConnector = function(callback) {
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            res.json({"code": 100, "status": "Error in connection database"});
            callback(null);
        }

        console.log('connected as id ' + connection.threadId);

        callback(connection);

        connection.on('error', function (err) {
            res.json({"code": 100, "status": "Error in connection database"});
            callback(null);
        });
    });
};

// Exporting outside, so that any once can get connection pool to transact with database
module.exports = {
    dbConnector
};