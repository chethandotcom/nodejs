'use strict';

// To get MySQL connection pool to connect to database
var mysqlpool = require('../../utility/database_connector');
var globalDefines = require('../../utility/globalDefines');

//  To get all investors data
var getAllHashtags = function(req, res) {
    mysqlpool.dbConnector(function(connection) {
        if (connection != null) {
            var query = "select * from livefeed";
            connection.query(query, function (err, rows) {
                connection.release();
                if (err) throw err;
                res.json(rows);
            });
        }
    });
};

var getHashtags = function(req, res) {
    mysqlpool.dbConnector(function(connection) {
        if (connection != null) {
            var query = "select hashtag from livefeed GROUP BY hashtag ORDER BY MAX(modifed) ASC";
            connection.query(query, function (err, rows) {
                connection.release();
                if (err) throw err;
                res.json(rows);
            });
        }
    });
};

var getMessageByHashtag = function(req, res) {
    // Getting the post parameters
    var hashtag = req.body.hashtag;

    if (hashtag == null) {
        // If password didn't match, send failure JSON
        res.json(globalDefines.failureJson);
        // Close the request
        res.end();

        // Stop executing further since email or password didn't received
        return;
    }

    mysqlpool.dbConnector(function(connection) {
        if (connection != null) {
            var query = "select message from livefeed where hashtag = ?";
            connection.query(query, [hashtag], function (err, rows) {
                connection.release();
                if (err) throw err;
                res.json(rows);
            });
        }
    });
};

// To create investor
var createHashtag = function(req, res) {
    // Getting the post parameters
    var hashtag = req.body.hashtag;
    var message = req.body.message;

    if (hashtag == null || message == null) {
        // If password didn't match, send failure JSON
        res.json(globalDefines.failureJson);
        // Close the request
        res.end();

        // Stop executing further since email or password didn't received
        return;
    }
    
    // Creating connection with database
    mysqlpool.dbConnector(function(connection) {
        if (connection != null) {
            // Creating SQL insert query and passing post parameters received
            var query = "INSERT INTO livefeed (hashtag, message) VALUES (?, ?)";
            connection.query(query, [hashtag, message], function (err, rows) {
                // Release database connection object
                connection.release();

                if (err) {
                    // If failed to insert, respond back with the error message so that the client can handle
                    res.json({"code": 100, "status": err.message});
                } else {
                    // If insert is successful, throw the data which includes insertID
                    res.json(rows);
                }

                // Close the request
                res.end();
            });
        }
    });
};



// Exposing outside for router to call
module.exports = {
    getAllHashtags,
    getHashtags,
    getMessageByHashtag,
    createHashtag
};
