'use strict';


var path            = require('path');
var async           = require('async');





let server          = require(path.resolve(__dirname, '../../server/server'));

// var database        = server.datasources.groceryDS;


// //include middleware
let Ingredients  = require(path.resolve(__dirname, 'ingredients'));

let Groceries    = require(path.resolve(__dirname, 'grocery'));

let Departments  = require(path.resolve(__dirname, 'departments'));


async.parallel({
	
		
		// ingredients : async.apply(Ingredients.createIngredients),
		departments : async.apply(Departments.createDepartments),

		// groceries   : async.apply(Groceries.createGroceries),

		// recipes     : async.apply(Recipes.createRecipes),
		

	
	}, function(err, results){
		if( err ) throw err; 

		// console.log(results.ingredients);
		console.log(results.departments);
		// console.log(results.groceries);


		


		// Departments.attachDepartmentsToIngredients(
		// 	results.departments, results.ingredients
		// 	);

		//:todo remove this function, when departments will work 
		// Departments.attachDepartmentsToGroceries(
		// 	results.departments, results.groceries
		// 	);


		// Ingredients.attachIngredientsToRecipes(
		// 	results.ingredients, results.recipes
		// 	);

	}
);


