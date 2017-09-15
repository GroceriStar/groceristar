'use strict';

var _ = require('underscore');


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

	// when we call this method - we know that this grocery is attached to user,
	// so it's not so important to check relations between this grocery and user

	Grocery.fetchById = function(groceryId, cb){

		Grocery.findById(groceryId, {		
			include: {
				relation: 'ingredients',
				scope: {

					// fields: [ 'id', 'name', 'department' ],
					include: {
						relation: 'department',
						scope: {
							// fields: [ 'id', 'name' ],
							// fields: [ 'name' ],
							// where: {
							// 	departmentId: id
							// }
						}
					}

				}
			}

		}, function(err, grocery){
			var g       = grocery.toJSON();
			let arr     = _.map(grocery.hideThisIds, item => item.toString());

            var uniques = _.map(_.groupBy(g.ingredients, function(item){
            	// console.log(item);           	
              return item.department.id.toString();
            }), function(grouped){

            	var departmentId = grouped[0].departmentId.toString();
            	var flag = _.contains(arr, departmentId);
            	

        		 var ja = _.map(grouped, function(item){
        		 	return [
            		 	item.id, 
            		 	item.name,
            		 	'/del/ing/' + item.id + '/' + g.id
        		 	] // :todo change this to an object
        		 });

            	

            	if ( !flag ) { 

            		return { id: grouped[0].department.id.toString(),
                        name: grouped[0].department.name,
                        type: grouped[0].department.type,
                        ingredients: ja,                        
                    };

            	}

            	return { id: grouped[0].department.id.toString(),
                        name: grouped[0].department.name,
                        type: grouped[0].department.type,
                        ingredients: [],                        
                    };
                

            });
            
            var response = {
                id: g.id,
                name: g.name,
                data: uniques
            };

			cb(null, response);

		});



	};

	// hidden Only
	// :todo update this, using withDepartments method
	Grocery.fetchById2 = function(groceryId, cb){

		Grocery.findById(groceryId, {		
			include: {
				relation: 'ingredients',
				scope: {

					// fields: [ 'id', 'name', 'department' ],
					include: {
						relation: 'department',
						scope: {
							// fields: [ 'id', 'name' ],
							// fields: [ 'name' ],
							// where: {
							// 	departmentId: id
							// }
						}
					}

				}
			}

		}, function(err, grocery){
			var g = grocery.toJSON();
 			
			let arr = _.map(grocery.hideThisIds, item => item.toString());

            var uniques = _.map(_.groupBy(g.ingredients, function(item){
            	// console.log(item);           	
              return item.department.id.toString();
            }), function(grouped){

            	var departmentId = grouped[0].departmentId.toString();
            	var flag = _.contains(arr, departmentId);
            	

        		 var ja = _.map(grouped, function(item){
        		 	return [
            		 	item.id, 
            		 	item.name,
            		 	'/del/ing/' + item.id + '/' + g.id
        		 	] // :todo change this to an object
        		 });

            	

            	if ( !flag ) { 

            		return false;

            	}

            	return { id: grouped[0].department.id.toString(),
                        name: grouped[0].department.name,
                        type: grouped[0].department.type,
                        ingredients: ja,                        
                    };
                

            });
            

            
            var response = {
                id: g.id,
                name: g.name,
                data: _.compact(uniques)
            };

          

			cb(null, response);

		});



	};


	//:todo add remote method for enable API calls for this method


	Grocery.cloner = function(groceryId, userId){
		Grocery.findById(groceryId, {
			include: ['ingredients', 'departmentsToHide']
			
		}, function(err, grocery){
			// console.log( grocery.name );
			// console.log( grocery );
			//:todo use createnew method instead of duplicate stuff
			var object = {
				name: 'Clone of < ' + grocery.name + ' >',
				desc: grocery.desc,
				slug: grocery.slug,
				img : grocery.img,
				hideThisIds  : grocery.hideThisIds,
				ingredientIds: grocery.ingredientIds,
				created_at   : new Date(),
				updated_at   : new Date(),
			};
		

			Grocery.create(object, function(err, model){

				var User    = Grocery.app.models.user;
			    var options = {
			      type  : 'attach',
			      field : 'groceryIds',
			      userId: userId,
			      secondArray: [ model.id ]
			    };
			    User.proceed(options);
			    // console.log('-----');
			});

			



		});
		

	}

	// 	data must have this structure:
	// {
	// 	title: data.title,
	// 	desc:  data.desc,
	// 	slug:  data.slug,
	// 	img :  data.img,
	// 	departmentIds: data.departmentIds,
	// 	hideThisIds:   data.hideThisIds,
	// }



	Grocery.createnew = function(userId, data, cb){

		Grocery.create(data, function(err, model){

			console.log(model)
			// :todo check relations with other sub models

			// console.log( model.id );
			// Grocery.attachToUser(model.id, userId, function(data){

			// });

		});

	};

	Grocery.withDepartments = function(groceryId, cb){
		Grocery.findById(groceryId, {		
			include: {
				relation: 'ingredients',
				scope: {
					include: {
						relation: 'department',
						// scope: {

						// }
					}

				}
			}

		}, cb);
	};




	//:todo think about adding count(to departments). 
	// So if ingredients in dep = 0 - don't show it
	Grocery.element = function(groceryId, cb){

		Grocery.withDepartments(groceryId, function(err, model){

			var g = grocery.toJSON();
			
			var departments = [];
			// console.log(g.desc);
			// console.log(g.departmentsList);

			// case #1 return only dep name with id for link creation
			g.departmentsList.forEach(function(item, i){

				if( item.visible ) {
					departments.push({
						 id: item.id,
						 name: item.name 
					});
				}	

				
			});
		})

	}


	Grocery.withPurchased = function(groceryId, cb){
		Grocery.findOne({
			include: {
				relation: 'purchased',
				scope: {
					fields: [ 'id', 'name' ],
					// include: {
					// 	relation: 'ingredients',
					// 	scope: {
					// 		fields: [ 'name' ],
					// 		// where: {
					// 		// 	departmentId: id
					// 		// }
					// 	}
					// }

				}
			},
			where: { id:groceryId }

		}, cb);
	};


	// Grocery.secondWave = function(groceryId, cb){

	// 	var Department = Grocery.app.models.Department;

	// 	Grocery.findById(groceryId, {

	// 	}, function(err, grocery){

	// 		console.log(grocery.ingredientIds);

	// 		var ingArr = grocery.ingredientIds;

	// 		Department.find({
	// 			include: {
	// 				relation: 'ingredients',
	// 				scope: {
	// 					where : {
	// 						id: {
	// 							inq: ingArr
	// 						}
	// 					}
	// 				}
	// 			}
	// 		}, function(err, model){

	// 			console.log(model);
	// 			console.log(model.ingredientIds);
	// 			var m = model.toJSON();
	// 			console.log(m.ingredients);

	// 		});

	// 	});


	// };


	Grocery.addPurchased = function(options){
		options.type  = 'add';
		options.field = 'purchasedIds'
		Grocery.proceed(options);

	};
	Grocery.removePurchased = function(options){
		options.type  = 'remove';
		options.field = 'purchasedIds'
		Grocery.proceed(options);

	};
	Grocery.cleanPurchased = function(options){
		options.type  = 'clear';
		options.field = 'purchasedIds'
		Grocery.proceed(options);
	};

	Grocery.addDepartment = function(options){
		options.type  = 'hide';
		options.field = 'hideThisIds'
		Grocery.proceed(options);	
	};
	Grocery.removeDepartment = function(options){
		options.type  = 'show';
		options.field = 'hideThisIds'
		Grocery.proceed(options);		
	};
	Grocery.showAllDepartments = function(options){
		options.type  = 'all';
		options.field = 'hideThisIds'
		Grocery.proceed(options);			
	};
	// Grocery.removeRemoveDepartment = function(options){
	// 	// options.type  = 'destroy';
	// 	// options.field = 'ingredientIds';
	// 	Grocery.removeIngredient(options);
	// };

	Grocery.addIngredient = function(options){
		options.type  = 'add-ing';
		options.field = 'ingredientIds';
		Grocery.proceed(options);			
	};
	Grocery.removeIngredient = function(options){
		options.type  = 'remove-ing';
		options.field = 'ingredientIds';
		Grocery.proceed(options);			
	};

	// Grocery.addItem = function(options){
	// 	options.type  = 'add-item';
	// 	options.field = 'itemsIds';
	// 	Grocery.proceed(options);	
	// };
	
	// Grocery.removeItem = function(options){
	// 	options.type  = 'remove-item';
	// 	options.field = 'itemsIds';
	// 	Grocery.proceed(options);	
	// };
	Grocery.proceed = function(options){

		var type = options.type;

		Grocery.findById(options.groceryId, {}, function(err, model){


			if( options.type == 'clear' || options.type ==  'all'){

				model.updateAttribute(options.field, []);	

			}


			if( options.type == 'add' || options.type == 'hide' || options.type == 'add-ing' ){

                let arr = _.map(model[options.field], item => item.toString());

                var mergedValues = _.union( arr, options.secondArray );

                model.updateAttribute(options.field, mergedValues);

			}		


			if( options.type == 'remove' || options.type == 'show' || options.type == 'remove-ing' ){

			
                if( !model[options.field] ){ return true; }

                let arr = _.map(model[options.field], item => item.toString());

                arr = arr.filter(item => !options.secondArray.includes(item));
                // !!! Read below about array.includes(...) support !!!

                model.updateAttribute(options.field, arr);

			}

			// console.log(model.hideThisIds);

			

		});

	}

	
};
