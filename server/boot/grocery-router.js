'use strict';

var request        = require('request');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
// var loopback = require('loopback');


module.exports = function(app) {

  var router  = app.loopback.Router();

  router.get('/change-the-name/grocery/:groceryId', function(req, res, next){ 
    var groceryId = req.params.groceryId;
  	var Grocery = app.models.Grocery;
  	Grocery.findById(groceryId, {}, function(err, model){
  		model.updateAttribute('title', 'Ultimate Grocery List #' + new Date().toString());
      res.redirect('/auth/account');
  	});

  });

  router.post('/addtopurchased', function(req, res, next){
    // console.log(req.body);
  	var Grocery        = app.models.Grocery;
    var ingredients    = req.body.ingredients;
   	var groceryId      = req.body.groceryId;

    // Grocery.makePurchased(groceryId, ingredientsArr, function(){});

    var options = {

      groceryId: groceryId,
      secondArray: ingredients 
    };
    Grocery.addPurchased(options);
    

    // var options = {
    //   type: 'clear',
    //   field: 'purchasedIds',
    //   groceryId: groceryId 
    // };
    // Grocery.proceed(options);
    
    // res.redirect('/auth/account');

  });

  router.post('/clearpurchased', function(req, res, next){
    // console.log(req.body);
    var Grocery        = app.models.Grocery;

    Grocery.cleanPurchased({});

    res.redirect('/auth/account');

  });

	router.get('/remove-from-purchased/:groceryId/:ingId', function(req, res, next){

		var Grocery = app.models.Grocery;

		// console.log( req.user.id );		

	 	var ingredients = req.params.ingId;
 		var groceryId   = req.params.groceryId;

    var options = {

      groceryId: groceryId,
      secondArray: ingredients 
    };
    Grocery.removePurchased(options);
    
    // Grocery.proceed(options);

		// Grocery.withPurchased(groceryId, ingredients, function(err, model){

		// 	var data = model.toJSON();
  //     console.log(data.purchased);
      
  //     if( !data.purchased ){ return true; } //:todo test this
      
  //     let forDeletion = ingredients;

	 //    let arr = data.favorites;

	 //    arr = arr.filter(item => !forDeletion.includes(item))
	 //      // !!! Read below about array.includes(...) support !!!

	 //      console.log(arr);

	 //      model.updateAttribute('purchasedIds', arr);
	 //      console.log(model);

  // 		});




  });


 //:todo add relations and display whole information about 
 //:todo make it more protected from view
 router.get('/view/grocery/:groceryId', ensureLoggedIn('/auth/account'), 
  function(req, res, next){

    // console.log( req.params.groceryId );
    // console.log( req.user.id );

    var Grocery   = app.models.Grocery;
    var groceryId = req.params.groceryId;
    // var userId    = req.user.id;

    // console.log(groceryId);
    // console.log(userId);


    Grocery.fetchById(groceryId, function(err, grocery){

    	// console.log(grocery);

    	// console.log(grocery.departments);

    	res.render('pages/grocery', {
    		  title: 'Grocery: ' + grocery.id,
	        data: grocery, //:todo change names, punk!
	        // url: req.url,
	        messages: {},
	        departments: grocery.departmentsList
	      });  

    });

    // Grocery.findById(req.params.groceryId, {}, function(err, grocery){
      
    //   console.log(grocery.departments);

  

    // });





 });



  router.get('/auth/attach-grocery-to-user/:groceryId', 
    ensureLoggedIn('/auth/account'), function(req, res, next) {

    // console.log( req.params );
    var groceryId = req.params.groceryId;
    var userId    = req.user.id;

    // console.log( req.params.groceryId );
    // console.log( req.user.id );

    var Grocery = app.models.Grocery;
    Grocery.attachToUser(groceryId, userId);

    res.redirect('/auth/account');
  });


 router.get('/remove/grocery/:groceryId', 
  ensureLoggedIn('/auth/account'), 
  function(req, res, next){
    var groceryId = req.params.groceryId;
    var userId    = req.user.id;
    
    var User      = app.models.user;
    var Grocery   = app.models.Grocery;

    // this is a duplicated function from Grocery :todo think about it, real talk   
    var options = {
      type  : 'detach',
      field : 'groceryIds',
      // groceryId: groceryId,
      userId: userId,
      secondArray: [ groceryId ]
    };
    User.proceed(options);

    Grocery.destroyById(groceryId, function(err){});

});





  router.get('/clone/:groceryId', function(req, res, next) {

    console.log( req.params.groceryId );
    console.log( req.user.id );

    var Grocery = app.models.Grocery;
    Grocery.clone( req.params.groceryId, req.user.id, function(){

    });

    // res.redirect('/');
  });






 router.get('create-new-grocery', 
  ensureLoggedIn('/auth/account'), function(req, res, next){

    console.log( req.user.id );
    var Grocery = app.models.Grocery;
    var data = {
      title: data.title,
      desc:  data.desc,
      slug:  '',
      img :  '',
      // departmentIds: [], // not sure if we need this
      // hideThisIds:   [],
    }
    Grocery.createnew(req.user.id, data, function(){});

 });


  app.use(router);

};