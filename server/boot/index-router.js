'use strict';

var request        = require('request');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
var path           = require('path');

var _ = require('underscore');

// var UserExtended = require(path.resolve(__dirname, '../../bin/import/users'));
// var loopback = require('loopback');
// let server          = require(path.resolve(__dirname, '../../server/server'));



module.exports = function(app) {

  var router  = app.loopback.Router();


  router.get('/home', function(req, res, next){

    res.render('pages/home', {
      user: req.user,
      url: req.url,
      // data: response
    });
  });

  router.get('/pidor/update', function(req, res, next){
    console.log(req.params);
  });
  router.get('/pidor/create', function(req, res, next){
    console.log(req.params);
  });





  router.get('/tatypidor', ensureLoggedIn('/auth/account'), function(req, res, next){
    

    var Grocery = app.models.Grocery;
    var userId    = req.user.id;
     var groceryId = '59aebf4832e8fb1c105968f9';

    Grocery.fetchById2(groceryId, function(err, response){

      // _.map(response.data)
      // console.log(response.data[0].ingredients);
      res.json(response.data[0].ingredients);

    })


    // res.json([
    //   {"title":"123","completed":false},
    //   {"title":"333","completed":false},
    //   {"title":"sam ty pidor."}
    //   ]);

  });

  router.get('/todo', function(req, res, next){

    res.render('pages/grocery2', {
      user: req.user,
      url: req.url,
      // data: response
    });
  });


  router.get('/select', function(req, res, next){

    res.render('pages/select-only-delete-later', {
      user: req.user,
      url: req.url,
      // data: response
    });
  });

 router.get('/sortable', function(req, res, next){

    res.render('pages/grocery2', {
      user: req.user,
      url: req.url,
      // data: response
    });
  });






  router.get('/landosik', function(req, res, next){

    res.render('pages/landing', {
      user: req.user,
      url: req.url,
      // data: response
    });
  });

  router.get('/', function(req, res, next) {
    var User    = app.models.user;

    User.withAdminAndUltimate(function(err, admin){

        var json     = admin.toJSON();
        var ultimate = json.groceries[0];
        var data = {
          id: ultimate.id,
          name: ultimate.name

        };
        // console.log(data);        

        res.render('pages/index', {
            user: req.user,
            url: req.url,
            data: data, 
        });

    });


    // console.log(UserExtended);

    
 //       // res.render('pages/grocery2', {
    //       //   user: req.user,
    //       //   url: req.url,
    //       //   data: response
    //       // });

//       // res.render('pages/home', {
    //       //   user: req.user,
    //       //   url: req.url,
    //       //   data: response
    //       // });


    //       // res.render('pages/dashboard', {
    //       //   user: req.user,
    //       //   url: req.url,
    //       //   data: response
    //       // });




  });


 

  app.use(router);

};