'use strict';

module.exports = function(Grocery) {

	Grocery.validatesPresenceOf(
		// 'departments',
		'img', 'desc', 'slug'
	);

	Grocery.observe('update', function(ctx, next){
		ctx.instance.updated_at = new Date();
		next();
	});

	Grocery.observe("before save", function updateTimestamp(ctx, next) {

		if( ctx.isNewInstance ){
			ctx.instance.created_at = new Date();
			ctx.instance.updated_at = new Date();
		} 



		next();
	});


	// :todo not sure what i mean by this.
	Grocery.fetch = function(){


		Grocery.findOne({
			include: {
				relation: 'departmentsList',
				scope: {
					fields: [ 'name' ],
					include: {
						relation: 'ingredients',
						scope: {
							fields: [ 'name' ],
							// where: {
							// 	departmentId: id
							// }
						}
					}

				}
			}


			// [
			// 'Ingredient',
			 
			// ]
		}).then(function(groceries){
			console.log(groceries);
		})

		// Ingredient = Grocery.app.models.Ingredient;

		// Department = Grocery.app.models.Department;

		// Grocery.find({})
		// .then(function(groceries){
		// 	console.log(groceries);


		// 	groceries.forEach(function(grocery){
		//  		// console.log(grocery.ingredients);
		//  		// console.log(grocery.departments);
		//  		// DepartmentModel.findByIds(grocery.departments)
		//  		// .then(function(departments){


		//  		// 	// console.log(departments.ingredients);
		//  		// 	IngredientModel.findByIds(grocery.ingredients)
		// 	 	// 	.then(function(ingredients){		 			
		// 	 	// 		// console.log(ingredients);
		// 	 	// 	})
		 		
		//  		// })

		//  		Ingredient.findByIds(grocery.ingredients)
		//  		.then(function(ingredients){		 			
		//  			// console.log(ingredients);
		//  		})
		// 	})


		// 	groceries.forEach(function(grocery){
		//  		// console.log(grocery.ingredients);
		//  		Ingredient.findByIds(grocery.ingredients)
		//  		.then(function(ingredients){		 			
		//  			// console.log(ingredients);
		//  		})
		// 	})


		// });





	};


	Grocery.remoteMethod('fetch', {
		// accepts: {
		//   arg: 'menuId',
		//   type: 'string',
		//   required: true
		// },
		returns: {
		  arg: 'groceries',
		  type: 'array'
		},
		http: {
		  path: '/list/',
		  verb: 'get'
		}
	});	



	// @TODO if we have empty menuId then we need to get groceries for the latest(read current active menu);

	Grocery.groceryListForMenu = function(menuId, cb){


		var Menu = Grocery.app.models.Menu;

		Menu.MenuRecipesIngredients(menuId, function(data){
			// @TODO test this "data" attribute
			console.log(data);
		});



		// GroceryModel.findById(groceryId)
		// .then(function(grocery){

		// 	DepartmentModel.find({
		// 		where:{
		// 			id: { inq:grocery.departments }
		// 		},
		// 		// fields: []       
		// 	},cb);

		// })
		// .catch(function(err){
		// 	if(err){ cb(err); }
		// });

	};

	Grocery.remoteMethod('groceryListForMenu', {
		accepts: {
		  arg: 'menuId',
		  type: 'string',
		  required: true
		},
		returns: {
		  arg: 'groceries',
		  type: 'array'
		},
		http: {
		  path: '/menu/:id',
  		  // path: '/:id/menu',
		  verb: 'get'
		}
	});


	// Grocery.attachToUser = function(cb){

	// }
	// Grocery.remoteMethod('groceryListForMenu', {
	// 	accepts: {
	// 	  arg: 'menuId',
	// 	  type: 'string',
	// 	  required: true
	// 	},
	// 	returns: {
	// 	  arg: 'groceries',
	// 	  type: 'array'
	// 	},
	// 	http: {
	// 	  path: '/menu/:id',
 //  		  // path: '/:id/menu',
	// 	  verb: 'get'
	// 	}
	// });
};
