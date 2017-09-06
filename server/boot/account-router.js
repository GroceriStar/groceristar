'use strict';

var request        = require('request');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

module.exports = function(app) {

	var router  = app.loopback.Router();

	router.get('/local', function(req, res, next) {
		res.render('pages/local', {
		  user: req.user,
		  url: req.url,
		  messages: {}
		});
	});
	
	router.get('/signup', function(req, res, next) {
		res.render('pages/signup', {
		  user: req.user,
		  url: req.url,
		  messages: {}
		});
	});

	router.post('/signup', function(req, res, next) {
		var User = app.models.user;

		var newUser        = {};
		newUser.email      = req.body.email.toLowerCase();
		newUser.username   = req.body.username.trim();
		newUser.password   = req.body.password;

		User.create(newUser, function(err, user) {
		  if (err) {
		    req.flash('error', err.message);
		    return res.redirect('back');
		  } else {
		    // Passport exposes a login() function on req (also aliased as logIn())
		    // that can be used to establish a login session. This function is
		    // primarily used when users sign up, during which req.login() can
		    // be invoked to log in the newly registered user.
		    req.login(user, function(err) {
		      if (err) {
		        req.flash('error', err.message);
		        return res.redirect('back');
		      }
		      return res.redirect('/auth/account');
		    });
		  }
		});
	});

	router.get('/login', function(req, res, next) {
		res.render('pages/login', {
		  user: req.user,
		  url: req.url,
		  messages: {}
		});
	});

	router.get('/auth/logout', function(req, res, next) {
		req.logout();
		res.redirect('/');
	});



	router.get('/auth/account', ensureLoggedIn('/login'), function(req, res, next) {
	    var Grocery = app.models.Grocery;
	    var User    = app.models.user; 
	    var userId  = req.user.id;
	    // console.log(req.user.id);

	    Grocery.fetch(function(error, response){

	        // console.log(response);
	          //:todo make this a separate method inside model
	           User.findById(userId, {}).then(function(model){
	              // console.log(model);
	              // console.log(model.groceryIds);

	              Grocery.find({
	                where: {id: {
	                  inq: model.groceryIds 
	                 }
	                }
	              }).then(function(models){


	                // console.log(models);


	                 res.render('pages/account', {
	                    user: req.user,
	                    url: req.url,
	                    groceries: models,
	                  //data: response //:todo change this names
	                }); 

	              });

	                

	           });

	          
	       

	    });
	    // .catch(function(err){
	    //   throw err;
	    // });


	});



  app.use(router);

};  