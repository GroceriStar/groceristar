'use strict';

var request        = require('request');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
// var loopback = require('loopback');




module.exports = function(app) {

  var router  = app.loopback.Router();

  router.get('change-the-name/:groceryId', function(req, res, next){
console.log( req.user.id );
    console.log( req.favoriteId );
  	var Grocery = app.models.Grocery;
	Grocery.findById(groceryId, {}, function(err, model){
		model.updateAttribute('title', 'Smack my bitch up');
	})

  });

  router.get('add-to-purchased', function(req, res, next){

 //  	var Grocery = app.models.Grocery;
 console.log( req.user.id );
    console.log( req.favoriteId );
	// Grocery.findById(groceryId, {}, function(err, model){
	// 	model.updateAttribute('title', 'Smack my bitch up');
	// })

  });

	router.get('remove-from-purchased', function(req, res, next){

		var Grocery = app.models.Grocery;
		console.log( req.user.id );
		console.log( req.ingredients );
		Grocery.withPurchased(groceryId, ingredients, function(err, model){

			var data = model.toJSON();
      		console.log(data.purchased);

	      if( !data.purchased ){ return true; } //:todo test this

	      let forDeletion = ingredients;

	      let arr = data.favorites;

	      arr = arr.filter(item => !forDeletion.includes(item))
	      // !!! Read below about array.includes(...) support !!!

	      console.log(arr);

	      model.updateAttribute('purchasedIds', arr);
	      console.log(model);

  		});

	// Grocery.findById(groceryId, {}, function(err, model){
	// 	model.updateAttribute('title', 'Smack my bitch up');
	// })



  });


  app.use(router);

};