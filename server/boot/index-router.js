'use strict';

var request        = require('request');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
// var loopback = require('loopback');




module.exports = function(app) {

  var router  = app.loopback.Router();



router.get('/', function(req, res, next) {
  res.render('pages/index', {user:
    req.user,
    url: req.url,
  });
});

router.get('/auth/account', ensureLoggedIn('/login'), function(req, res, next) {


  var Grocery = app.models.Grocery;

  Grocery.findOne()
  .then(function(grocery){
    console.log(grocery);
    console.log(grocery.id);


      res.render('pages/loginProfiles', {
        user: req.user,
        url: req.url,

      });

  }).cathc(function(err){
    throw err;
  })

  // res.render('pages/loginProfiles', {
  //   user: req.user,
  //   url: req.url,
  // });
});

router.get('/local', function(req, res, next) {
  res.render('pages/local', {
    user: req.user,
    url: req.url,
  });
});

router.get('/ldap', function(req, res, next) {
  res.render('pages/ldap', {
    user: req.user,
    url: req.url,
  });
});

router.get('/signup', function(req, res, next) {
  res.render('pages/signup', {
    user: req.user,
    url: req.url,
  });
});

router.post('/signup', function(req, res, next) {
  var User = app.models.user;

  var newUser = {};
  newUser.email = req.body.email.toLowerCase();
  newUser.username = req.body.username.trim();
  newUser.password = req.body.password;

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
  });
});

router.get('/auth/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});


router.get('/auth/attach-grocery-to-user', function(req, res, next) {
  console.log( req.params.groceryId );
  console.log( req.user );
  // res.redirect('/');
});


 
/*  maybe not working stuff */
  router.post('/profile', function(req, res) {
    var email    = req.body.email;
    var password = req.body.password;
    // console.log(email, password);


    app.models.user.login({
      email: email,
      password: password
    }, 'user', function(err, token){

      if( err ){
        res.render('index', {
          email: email,
          password: password,
          loginFailed: true
        });  
      }

      token = token.toJSON();

      // console.log( token );

      // app.models.VideoModel.listVideosByUser(token.user.id, function(err, videos){

        if(err) throw err;
        // console.log( videos );


        res.render('profile', {
          username: token.user.username,
          userId: token.user.id,
          accessToken: token.id,
          // videoArray: videos
        });

      });





    });






 

  app.use(router);

};