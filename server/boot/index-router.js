'use strict';

var request        = require('request');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
// var loopback = require('loopback');




module.exports = function(app) {

  var router  = app.loopback.Router();



  router.get('/', function(req, res, next) {

    var Grocery = app.models.Grocery;

    // Grocery.fetch();
    Grocery.fetch(function(error, response){

        console.log(response);

          res.render('pages/index', {
            user: req.user,
            url: req.url,
            data: response //:todo change this names
          });

    });


    // res.render('pages/index', {
    //   user:
    //   req.user,
    //   url: req.url,
    // });
  });

  router.get('/auth/account', ensureLoggedIn('/login'), function(req, res, next) {


    var Grocery = app.models.Grocery;

    Grocery.fetch();


    // Grocery.findOne()
    // .then(function(grocery){
    //   console.log(grocery);
    //   console.log(grocery.id);
    //   // console.log(grocery.departmentIds);
    //   // console.log(grocery.title);

    //     // res.render('pages/loginProfiles', {
    //     //   user: req.user,
    //     //   url: req.url,

    //     // });

    // }).catch(function(err){
    //   throw err;
    // })

    // res.render('pages/loginProfiles', {
    //   user: req.user,
    //   url: req.url,
    // });
  });

  router.get('/local', function(req, res, next) {
    res.render('pages/local', {
      user: req.user,
      url: req.url,
      messages: {}
    });
  });

  //:todo decide which method is better - grocery version or controller version
  router.get('/department/:id', function(req, res, next){

      var departmentId = req.params.id;
      var Department   = app.models.Department;

      Department.methodA(departmentId, function(departments){

        console.log(departments);

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

  router.get('/delete/department/:id', function(req, res, next){

    var departmentId = req.params.id;
    var Department   = app.models.Department;
    Department.destroyById(departmentId, function(err){

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
      messages: {}
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


 





 

  app.use(router);

};