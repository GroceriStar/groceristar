'use strict';

const request  = require('request');
const _        = require("underscore");
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

module.exports = function(app) {
	var router  = app.loopback.Router();

	// :todo this must be a remote method
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






	// :todo this must be a remote method
	// router.post('/del/ing/', function(req, res, next){
	// 	// var ingredientId = req.params.id;
	// 	// var groceryId = req.params.groceryId;
	// 	var ingredients    = req.body.ingredients;
 //    	var groceryId      = req.body.groceryId;
 //    	console.log(req.body);
	// 	var Grocery   = app.models.Grocery;
		
	// 	var options = {

	//       groceryId: groceryId,
	//       secondArray: ingredients
	//     };
	// 	// console.log(options);
	    
	// 	Grocery.removeIngredient(options);
	// 	res.json('success');
	// 	// res.redirect('/view/grocery/' + groceryId);

	// });






	// Ing change Department ID
	router.get('/changedepartmentid/:id/:departmentId', function(req, res, next){
		var Ingredient   = app.models.Ingredient;
		var ingredientId = req.params.id;
		var departmentId = req.params.departmentId;

		Ingredient.findById(ingredientId, function(err, model){
			model.updateAttribute('departmentId', departmentId);
		})
	});


	// :todo this maybe not used function
	// router.post('/remove-department-from-ingredient', function(req, res, next){

	// 	var Ingredient   = app.models.Ingredient;
	// 	var ingredientId = req.params.id;
	// 	var departmentId = req.params.departmentId;

	// 	Ingredient.findById(ingredientId, function(err, model){
	// 		model.updateAttribute('departmentId', false);
	// 	})

	// });

	// Ing change name
	router.post('/changename/', function(req, res, next){
		var Ingredient   = app.models.Ingredient;
		var ingredientId = req.body.id;
		var name         = req.body.name;

		Ingredient.findById(ingredientId, function(err, model){
			model.updateAttribute('name', name);

			res.json('success');
		});
	});




	// Ing create. Not working with not advanced forms
	router.post('/create/ing/', function(req, res, next){
		var Ingredient   = app.models.Ingredient;
		var Grocery      = app.models.Grocery;
	
		var departmentId = req.body.departmentId;
		var name         = req.body.name;

		var groceryId    = req.body.groceryId;
		
		var object = {
			name: name,
			departmentId: departmentId,
			custom: true
		};

		Ingredient.create(object, function(err, model){

			// console.log(model);
			var options = {
		      groceryId: groceryId,
		      secondArray: [ model.id ]
		    };
		    // console.log(options);
			Grocery.addIngredient(options);
			// res.json('success');
			res.json({ id: model.id });
			// res.redirect('/department/' + departmentId + '/' + groceryId); // :todo update this
		});


	});


	// router.post('/delete/ingredients/:ingredients', function(req, res, next){

	// })


	    // [
      //   {"title":"123", "completed":false, "departmentId": "0"},
      //   {"title":"333", "completed":false, "departmentId": "0"},
      //   {"title":"Ingredos", "completed":false, "departmentId": "0"}
      // ]
  // :todo think about making this post instead of get
  // router.get('/getingredients/:groceryId/:departmentId/', 
	router.get('/getingredients/:groceryId/:departmentId/', 
		ensureLoggedIn('/auth/account'),  // :todo get back this 
		function(req, res, next){    
		var Grocery      = app.models.Grocery;
		// var userId    = req.user.id;
		var groceryId    = req.params.groceryId;
		var departmentId = req.params.departmentId;

		Grocery.fetchById3(groceryId, departmentId, function(err, response){
		  // console.log(response);
		  // console.log(response.data.ingredients);
		  res.json(response.data.ingredients);
		});

	});



	app.use(router);
};  	