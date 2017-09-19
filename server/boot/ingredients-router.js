'use strict';

const request  = require('request');
const _        = require("underscore");
// var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

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
	router.post('/del/ing/', function(req, res, next){
		// var ingredientId = req.params.id;
		// var groceryId = req.params.groceryId;

		var ingredients    = req.body.ingredients;
    	var groceryId      = req.body.groceryId;
    	console.log(req.body);
		var Grocery   = app.models.Grocery;
		
		var options = {

	      groceryId: groceryId,
	      secondArray: ingredients
	    };
		// console.log(options);
	    
		Grocery.removeIngredient(options);
		res.json('success');
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


	// Ing create. Not working with not advanced forms
	router.post('/create/ing/', function(req, res, next){
		var Ingredient   = app.models.Ingredient;
		var Grocery      = app.models.Grocery;
	
		var departmentId = req.body.departmentId;
		var name         = req.body.name;

		var groceryId    = req.body.groceryId;
		
		var object = {
			name: name,
			departmentId: departmentId
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
			res.json({id: model.id});
			// res.redirect('/department/' + departmentId + '/' + groceryId); // :todo update this
		});


	});


	router.post('/delete/ingredients/:ingredients', function(req, res, next){

	})




	app.use(router);
};  	