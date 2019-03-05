// Getting the express instance
var express = require('express');
// Setting express server to app
var app = express();

// Getting body parser to parse POST parameters
var bodyParser = require('body-parser');
// Support json encoded bodies
app.use(bodyParser.json());
// Support encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Getting investor routes
var routes = require('./api/routes/hashtagRoutes');
// Setting routers
routes(app);

// Setting the port to listen to
app.listen(2465);