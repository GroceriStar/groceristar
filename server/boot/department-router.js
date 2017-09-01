'use strict';

var request        = require('request');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

module.exports = function(app) {

	var router  = app.loopback.Router();
	
	
	//:todo decide which method is better - grocery version or controller version
	router.get('/department/:id', function(req, res, next){

	  var departmentId = req.params.id;
	  var Department   = app.models.Department;

	  Department.methodA(departmentId, function(departments){

	    // console.log(departments);

	    var d = departments.toJSON();

	    // console.log(d);
	    // console.log(d.ingredients);

	    var renderObject = {
	      ingredients: d.ingredients,
	      name: d.name,
	      description: d.desc,
	      id: d.id
	    }

	    console.log(renderObject)

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
	router.get('/visibility/department/:id', function(req, res, next){
		
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






	app.use(router);

};  	