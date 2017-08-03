'use strict';


var path            = require('path');
var async           = require('async');

// let server          = require(path.resolve(__dirname, '../../server/server'));


// //include middleware
let Ingredients  = require(path.resolve(__dirname, 'ingredients'));

let Groceries    = require(path.resolve(__dirname, 'grocery'));

let Departments  = require(path.resolve(__dirname, 'departments'));



async.series()


async.parallel({
	
		
		
		departments : async.apply(Departments.createDepartments),
		// ingredients : async.apply(),

		groceries   : async.apply(Groceries.createGroceries),

		// recipes     : async.apply(Recipes.createRecipes),
		

	
	}, function(err, results){
		if( err ) throw err; 

		// console.log(results.ingredients);
		// console.log(results.departments[0]);
		// console.log(results.departments[0].id);
		// console.log(results.groceries);
		// var Ingredients  = require(path.resolve(__dirname, 'ingredients'))(departments);
		var ingredients = Ingredients.createIngredients(results.departments);

		console.log(ingredients);


		// Departments.attachDepartmentsToIngredients(
		// 	results.departments, results.ingredients
		// 	);

		//:todo remove this function, when departments will work 
		Departments.attachDepartmentsToGroceries(
			results.departments, results.groceries
		);



	}
);


