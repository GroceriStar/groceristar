'use strict';

var request        = require('request');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
// var loopback = require('loopback');




module.exports = function(app) {

  var router  = app.loopback.Router();

  router.get('change-the-name/:groceryId', function(req, res, next){

  	var Grocery = app.models.Grocery;
	Grocery.findById(groceryId, {}, function(err, model){
		model.updateAttribute('title', 'Smack my bitch up');
	})

  });


  app.use(router);

};