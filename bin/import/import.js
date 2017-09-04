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

		console.log(results.departments);

		Ingredients.createIngredients(
			results.departments, function(err, ingredients){
				// console.log(model);

				Ingredients.attachIngredientsToGroceries(
						ingredients, results.groceries
			 	);

			});

		// console.log(ingredient);
		console.log('import finished');
		



	}
);
