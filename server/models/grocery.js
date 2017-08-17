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

		}).then(function(grocery){
			console.log(grocery);

			// grocery.departmentsList.forEach(function(item, i){
			// 	console.log(item.ingredients);
			// })
			// console.log(grocery.departmentsList);



		})










	};


	Grocery.remoteMethod('fetch', {
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


		// var Menu = Grocery.app.models.Menu;

		// Menu.MenuRecipesIngredients(menuId, function(data){
		// 	// @TODO test this "data" attribute
		// 	console.log(data);
		// });



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
