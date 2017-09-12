'use strict';

var request        = require('request');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
// var loopback = require('loopback');


module.exports = function(app) {

  var router  = app.loopback.Router();

  

  router.post('/update/name', function(req, res, next){
    var groceryId = req.body.groceryId;
    var name      = req.body.name;
    var Grocery   = app.models.Grocery;

    Grocery.findById(groceryId, {}, function(err, model){
      model.updateAttribute('name', name);
      res.redirect('/auth/account');
    });


  });



  router.post('/addtopurchased', function(req, res, next){
  	var Grocery        = app.models.Grocery;
    var ingredients    = req.body.ingredients;
   	var groceryId      = req.body.groceryId;

    var options = {
      groceryId: groceryId,
      secondArray: ingredients 
    };
    Grocery.addPurchased(options);  
    res.redirect('/auth/account');

  });

  router.post('/clearpurchased', function(req, res, next){
    var Grocery = app.models.Grocery;

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
    
    




  });


 //:todo add relations and display whole information about 
 //:todo make it more protected from view
 router.get('/view/grocery/:groceryId', 
  ensureLoggedIn('/auth/account'), 
  function(req, res, next){
    var Grocery   = app.models.Grocery;
    var User      = app.models.user;
    var groceryId = req.params.groceryId;
    // var userId    = req.user.id; 


    Grocery.fetchById(groceryId, function(err, response){

      // :todo make all data came from method
      res.render('pages/grocery', {
          name: response.name,
          elements: response.data, // [data>> department >> ingredient]
          groceryId: groceryId,
          // url: req.url,
          messages: {},
        }); 


   


    //   // :todo make all data came from method
    //   // res.render('pages/grocery', {
    //   //     title: response.title,
    //   //     elements: response.data, // [data>> department >> ingredient]
    //   //     groceryId: groceryId,
    //   //     // url: req.url,
    //   //     messages: {},
    //   //     // departments: grocery.departmentsList
    //   //   }); 



    	


    });


 });

 router.get('/view/grocery/hidden/:groceryId',
  ensureLoggedIn('/auth/account'),
  function(req, res, next){
    var Grocery   = app.models.Grocery;
    var groceryId = req.params.groceryId;

    // only hidden departments will be diplsayed
    Grocery.fetchById2(groceryId, function(err, response){

      // console.log(response);
      
      // :todo make all data came from method
      res.render('pages/grocery', {
          name: 'Hidden departments of ' + response.name,
          elements: response.data, // [data>> department >> ingredient]
          groceryId: groceryId,
          messages: {},

      });  

    });

  });



  router.get('/auth/attach-grocery-to-user/:groceryId', 
    ensureLoggedIn('/auth/account'), 
    function(req, res, next) {
    var groceryId = req.params.groceryId;
    var userId    = req.user.id;
    var User      = app.models.user;
    var Grocery   = app.models.Grocery;

    // this is a duplicated function from Grocery :todo think about it, real talk   
    var options = {
      userId: userId,
      secondArray: [ groceryId ]
    };
    User.addGrocery(options);
    // User.proceed(options);

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
      userId: userId,
      secondArray: [ groceryId ]
    };
    User.proceed(options);

    Grocery.destroyById(groceryId, function(err){});
    res.redirect('/auth/account');

});



  router.get('/clone/:groceryId', function(req, res, next) {
    var userId    = req.user.id;    
    var groceryId = req.params.groceryId;  
    var Grocery   = app.models.Grocery;
    // console.log(typeof userId);
    Grocery.cloner( groceryId, userId );

    res.redirect('/auth/account');
  });





// :todo finish
 router.get('create-new-grocery', 
  ensureLoggedIn('/auth/account'), 
  function(req, res, next){

    // console.log( req.user.id );
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
    // res.redirect('/');

 });

// :todo finish
 router.get('/view/groceries', 
  ensureLoggedIn('/auth/account'), 
  function(req, res, next){
    var userId    = req.user.id;    
    var User      = app.models.user;

    User.methodofAllMethods(userId, function(err, data){
      // console.log(data);
      res.render('pages/grocery-list', {
        title: 'GrocerIES ATTACHED TO THIS USER ' + userId,
        // url: req.url,
        messages: {},
        groceries: data.response,

      }); 

    });

 });


 // :todo delete later
 // router.get('/change-the-name/grocery/:groceryId', function(req, res, next){ 
 //    var groceryId = req.params.groceryId;
 //    var Grocery = app.models.Grocery;
 //    Grocery.findById(groceryId, {}, function(err, model){
 //      model.updateAttribute('name', 'Ultimate Grocery List #' + new Date().toString());
 //      res.redirect('/auth/account');
 //    });

 //  });

  app.use(router);

};