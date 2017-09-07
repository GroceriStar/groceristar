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

	      groceryId: groceryId,
	      secondArray: [ ingredientId ]
	    };
		// console.log(options);
	    
		// Grocery.removeIngredient(options);
		// res.redirect('/view/grocery/' + groceryId);

	});


	// Ing change Department ID
	router.get('/changedepartmentid/:id/:departmentId', function(req, res, next){
		var Ingredient   = app.models.Ingredient;
		var ingredientId = req.params.id;
		var departmentId = req.params.departmentId;

		Ingredient.findById(ingredientId, function(err, model){
			model.updateAttribute('departmentId', departmentId);
		})
	});

	// Ing change name
	// :todo validation add
	router.get('/changename/:id/:name', function(req, res, next){
		var Ingredient   = app.models.Ingredient;
		var ingredientId = req.params.id;
		var name         = req.params.name;
		 
		Ingredient.findById(ingredientId, function(err, model){
			model.updateAttribute('name', name);
		})
	});

	// Ing create
	// :todo update when 
	router.post('/create/ing/:groceryId', function(req, res, next){
		var Ingredient   = app.models.Ingredient;
		var Grocery      = app.models.Grocery;
		var object = {
			name: req.body.name,
			departmentId: req.body.departmentId
		};
		 
		Ingredient.create(object, function(err, model){

			// ADD removing ID FROM DATABASE
			// Grocery.

			res.redirect('/url-will-be'); // :todo update this
		});


	});



	app.use(router);
};  	