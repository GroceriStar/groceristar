'use strict';

var request        = require('request');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
// var loopback = require('loopback');


module.exports = function(app) {
  var router  = app.loopback.Router();

  // move this to remote methods :todo
  router.post('/addtopurchased', function(req, res, next){
  	var Grocery        = app.models.Grocery;
    var ingredients    = req.body.ingredients;
   	var groceryId      = req.body.groceryId;

    console.log(req.body);

    var options = {
      groceryId: groceryId,
      secondArray: ingredients 
    };
    Grocery.addPurchased(options); 
    res.json('success');
    // res.redirect('/auth/account');

  });


  router.post('/clearpurchased', function(req, res, next){
    var Grocery = app.models.Grocery;

    Grocery.cleanPurchased({});

    res.redirect('/auth/account');

  });


  // used for ajax call from todo list
  router.post('/remove-from-grocerylist', function(reqm res, next){
    var Grocery = app.models.Grocery;
    var ingredients    = req.body.ingredients;
    var groceryId      = req.body.groceryId;


    // var ingredients = req.params.ingId;
    // var groceryId   = req.params.groceryId;

    var options = {
      groceryId: groceryId,
      secondArray: ingredients 
    };

    Grocery.removePurchased(options);
      
    Grocery.removeIngredient(options);

    // :todo add removing ingredient from whole database

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

  app.use(router);
};