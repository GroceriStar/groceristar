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

    var User    = app.models.user; 
    var userId  = req.user.id;
    // console.log(req.user.id);

    Grocery.fetch(function(error, response){

        // console.log(response);
          //:todo make this a separate method inside model
           User.findById(userId, {}).then(function(model){
              console.log(model);
              console.log(model.groceryIds);

              Grocery.find({
                where: {id: {inq:model.groceryIds}}
              }).then(function(models){


                console.log(models);


                 res.render('pages/loginProfiles', {
                    user: req.user,
                    url: req.url,
                    groceries: models
                  //data: response //:todo change this names
                }); 

              });

                

           });

          
         //   res.render('pages/loginProfiles', {
         //    user: req.user,
         //    url: req.url,
         //    groceries: false
         //    //data: response //:todo change this names
         // });

    });
    // .catch(function(err){
    //   throw err;
    // });




    
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


  router.get('/clone/:id', function(req, res, next) {

    console.log( req.params.groceryId );
    console.log( req.user.id );

    var Grocery = app.models.Grocery;
    Grocery.clone( req.params.groceryId, req.user.id );

    // res.redirect('/');
  });

  router.get('/favorites', ensureLoggedIn('/auth/account'), function(req, res, next){

    console.log( req.user.id );

    var User = app.models.user;
    User.listFavorites(req.user.id, function(error, results){

      console.log(results);

      res.render('pages/favorites', {
        list: results, //:todo change names, punk!
        // url: req.url,
        messages: {}
      });

    })

  });

  router.post('/delete/favorites', function(req, res, next){
    console.log( req.user.id );
    console.log( req.favoriteId ); // this is ingredient Id - we need to remove this id from array 
  });

  //:todo fix delete or finish this
  router.post('/add/fav', function(req, res, next){

    console.log(req.body);
    console.log(req.params);

  });

  router.get('/add/fav2/:ingredientId', function(req, res, next){

    var ingredientId = req.params.ingredientId;
    var userId       = req.user.id;

    console.log( ingredientId );
    console.log( userId );

    var User = app.models.user;
    User.attachFavoriteToUser(ingredientId, userId);

    res.redirect('/auth/account');


  });

  
 





 

  app.use(router);

};