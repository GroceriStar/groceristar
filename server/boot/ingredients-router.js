'use strict';

var request        = require('request');
// var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

module.exports = function(app) {
	var router  = app.loopback.Router();


	router.get('/add/ing/:id/:groceryId', function(req, res, next){
		var ingredientId = req.params.id;
		var groceryId    = req.params.groceryId;
		
		var Grocery   = app.models.Grocery;
		
		var options = {
	      groceryId: groceryId,
	      secondArray: [ ingredientId ]
	    };
		Grocery.addIngredient(options);

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
	    
		Grocery.removeIngredient(options);
		res.redirect('/view/grocery/' + groceryId);

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
	router.post('/create/ing/', function(req, res, next){
		var Ingredient   = app.models.Ingredient;
		var Grocery      = app.models.Grocery;
		var groceryId    = req.body.groceryId;
		var departmentId = req.body.departmentId;

		console.log(req.body);



		// var object = {
		// 	name: req.body.name,
		// 	departmentId: departmentId
		// };
		
		// console.log(object); 

		// Ingredient.create(object, function(err, model){

		// 	// console.log(model);

		// 	var options = {
		//       groceryId: groceryId,
		//       secondArray: [ model.id ]
		//     };
		//     // console.log(options);


		// 	Grocery.addIngredient(options);

		// 	res.redirect('/department/' + departmentId + '/' + groceryId); // :todo update this
		// });


	});



	app.use(router);
};  	