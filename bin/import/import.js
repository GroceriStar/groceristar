'use strict';


var path            = require('path');
var async           = require('async');

// let server          = require(path.resolve(__dirname, '../../server/server'));


// //include middleware
let Ingredients  = require(path.resolve(__dirname, 'ingredients'));

let Groceries    = require(path.resolve(__dirname, 'grocery'));

let Departments  = require(path.resolve(__dirname, 'departments'));



// async.series()


async.parallel({		
		departments : async.apply(Departments.createDepartments),
		groceries   : async.apply(Groceries.createGroceries),

		// recipes     : async.apply(Recipes.createRecipes),
		

	
	}, function(err, results){
		if( err ) throw err; 


		var ingredient = Ingredients.createIngredients(
			results.departments
		);

		console.log(ingredient);

		Ingredients.attachIngredientsToGroceries(
			ingredient, results.groceries
			);



	}
);
