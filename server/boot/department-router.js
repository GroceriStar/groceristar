'use strict';

var request        = require('request');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
var _ = require('underscore');

module.exports = function(app) {

	var router  = app.loopback.Router();
	
	

	//:todo decide which method is better - grocery version or controller version
	router.get('/department/:id/:groceryId', function(req, res, next){

	  var departmentId = req.params.id;
	  var groceryId = req.params.groceryId;
	  var Department   = app.models.Department;

	  Department.methodA(departmentId, function(departments){

	    var d = departments.toJSON();

	    var renderObject = {
	      ingredients: d.ingredients,
	      name: d.name,
	      description: d.desc,
	      id: d.id,
	      groceryId: groceryId

	    }

	    // console.log(renderObject)

	    res.render('pages/department', renderObject);
	    
	  });

	  

	});


	// :todo make it work 
	router.get('/hide/department/:id/:groceryId', function(req, res, next){
		var departmentId = req.params.id;
		var groceryId = req.params.groceryId;
		
		var Grocery   = app.models.Grocery;
		
		var options = {
	      // type: 'hide',
	      // field: 'hideThisIds',
	      groceryId: groceryId,
	      secondArray: [ departmentId ]
	    };
		

		Grocery.addDepartment(options);


		// .findById(departmentId, {}, function(err, model){
		//   model.updateAttribute('visible', false);
		// });
	});



	router.get('/show/department/:id/:groceryId', function(req, res, next){
		var departmentId = req.params.id;
		var groceryId = req.params.groceryId;

		var Grocery   = app.models.Grocery;
		
		var options = {
	      // type: 'show',
	      // field: 'hideThisIds',
	      groceryId: groceryId,
	      secondArray: [ departmentId ]
	    };
		
	    
		Grocery.removeDepartment(options);

	});


// :todo test this
	router.get('/show/all/:groceryId', function(req, res, next){
		var departmentId = req.params.id;
		var groceryId = req.params.groceryId;

		var Grocery   = app.models.Grocery;
		
		var options = {
	      // type: 'show',
	      // field: 'hideThisIds',
	      groceryId: groceryId,
	      // secondArray: [ departmentId ]
	    };
		
	    
		Grocery.showAllDepartments(options);
	});



	// :todo make it work  or delete?
	router.get('/visibility/department/:id/:groceryId', function(req, res, next){
		
		var departmentId = req.params.id;
		var Department   = app.models.Department;
		// Department.findById(departmentId, {}, function(err, model){

		//   if(model.visible){
		//     model.updateAttribute('visible', false);    
		//   } else {
		//     model.updateAttribute('visible', true);    
		//   }
		// });

	});


	// visibility for a few departments at one time

	// router.get('/remove/department/:id/:groceryId', function(req, res, next){
	// 	var departmentId = req.params.id;
	// 	var groceryId    = req.params.groceryId;

	// 	var Grocery      = app.models.Grocery;
		
	// 	var options = {
	//       groceryId: groceryId,
	//       secondArray: [ departmentId ]
	//     };
		
	// 	Grocery.removeRemoveDepartment(options);	    
	// 	// Grocery.removeDepartment(options);


	// 	Grocery.findById(groceryId, {
	// 		include: {
	// 			relation: 'ingredients',
	// 			scope: {
	// 				where: {
	// 					departmentId: departmentId
	// 				}
	// 			}
	// 		}

	// 	}, function(err, grocery){

	// 		console.log(grocery);

	// 		var g = grocery.toJSON();

	// 		var toRemove = _.pluck(g.ingredients, 'id');

	// 		console.log(toRemove);

	// 		var options = {
	// 	      groceryId: groceryId,
	// 	      secondArray: toRemove
	// 	    };
				    
	// 		Grocery.removeIngredient(options);

	// 	});

	// 	res.redirect('/view/grocery/' + groceryId);

	// });

	router.get('/remove/department/:id/:groceryId', function(req, res, next){
		var departmentId = req.params.id;
		var groceryId    = req.params.groceryId;

		var Grocery      = app.models.Grocery;
		
		// var options = {
	 //      groceryId: groceryId,
	 //      secondArray: [ departmentId ]
	 //    };
		

		// Grocery.removeDepartment(options);


		Grocery.findById(groceryId, {
			include: {
				relation: 'ingredients',
				scope: {
					where: {
						departmentId: departmentId
					}
				}
			}

		}, function(err, grocery){

			console.log(grocery);

			var g = grocery.toJSON();

			var toRemove = _.pluck(g.ingredients, 'id');
			toRemove     = _.map(toRemove, item => item.toString());
			
			console.log(toRemove);



			var options = {
		      groceryId: groceryId,
		      secondArray: toRemove
		    };
				    
			Grocery.removeIngredient(options);

			// Grocery.removeRemoveDepartment(options);

		});

		res.redirect('/view/grocery/' + groceryId);

	});




	app.use(router);

};  	