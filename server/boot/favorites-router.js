'use strict';

var request        = require('request');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

module.exports = function(app) {

	var router  = app.loopback.Router();
	
  router.get('/favorites', ensureLoggedIn('/auth/account'), function(req, res, next){

    // console.log( req.user.id );

    var User = app.models.user;
    User.listFavorites(req.user.id, function(error, response){
      console.log(response);

      // console.log(results);

      res.render('pages/favorites', {
        data: response, //:todo change names, punk!
        // url: req.url,
        messages: {}
      });

    })

  });

  router.post('/delete/favorites/:favoriteId', 
    ensureLoggedIn('/auth/account'), function(req, res, next){
    console.log( req.user.id );
    console.log( req.favoriteId ); // this is ingredient Id - we need to remove this id from array 
    var User = app.models.user;
    User.findById(req.user.id, {

    })

    User.getCurrentUserWithFavorites(req.user.id, function(err, model){

      var data = model.toJSON();
      console.log(data.favorites);

      if( !data.favorites ){ return true; } //:todo test this

      let forDeletion = [ req.favoriteId ];

      let arr = data.favorites;

      arr = arr.filter(item => !forDeletion.includes(item))
      // !!! Read below about array.includes(...) support !!!

      console.log(arr);

      model.updateAttribute('favs', arr);
      console.log(model);

    })

  });

  //:todo fix delete or finish this
  router.post('/add/fav', function(req, res, next){

    console.log(req.body);
    console.log(req.params);

  });

  router.get('/add/fav2/:ingredientId', function(req, res, next){

    var ingredientId = req.params.ingredientId;
    var userId       = req.user.id;

    // console.log( ingredientId );
    // console.log( userId );

    var User = app.models.user;
    User.attachFavoriteToUser(ingredientId, userId);

    res.redirect('/auth/account');


  });



	app.use(router);

};  