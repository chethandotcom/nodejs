'use strict';

// Exporting outside for server.js to setup router
module.exports = function(app) {
  // Getting controller instance
  var investorController = require('../controllers/hashtagContoller');

  // Investor Routes
  app.route('/api/livehashtag/')
    .get(investorController.getAllHashtags)
    .post(investorController.createHashtag);

  app.route('/api/livehashtag/selective/hashtags')
    .get(investorController.getHashtags);

  app.route('/api/livehashtag/selective/messages')
    .post(investorController.getMessageByHashtag);  
};