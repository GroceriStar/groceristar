'use strict';

var request        = require('request');
// var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

module.exports = function(app) {
	var router  = app.loopback.Router();

	router.get('/add/ing/:id/:groceryId', function(req, res, next){
		var ingredientId = req.params.id;
		var groceryId = req.params.groceryId;
		
		var Grocery   = app.models.Grocery;
		
		var options = {
	      // type: 'hide',
	      // field: 'hideThisIds',
	      groceryId: groceryId,
	      secondArray: [ ingredientId ]
	    };
		

		Grocery.addIngredient(options);


		// .findById(departmentId, {}, function(err, model){
		//   model.updateAttribute('visible', false);
		// });
	});

	router.get('/del/ing/:id/:groceryId', function(req, res, next){
		var ingredientId = req.params.id;
		var groceryId = req.params.groceryId;

		var Grocery   = app.models.Grocery;
		
		var options = {
	      // type: 'show',
	      // field: 'hideThisIds',
	      groceryId: groceryId,
	      secondArray: [ ingredientId ]
	    };
		
	    
		Grocery.removeIngredient(options);

	});


	// Ing change Department ID
	// Ing change name
	// Ing create



	app.use(router);
};  	