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
 router.get('/sortable', function(req, res, next){

    res.render('pages/grocery2', {
      user: req.user,
      url: req.url,
      // data: response
    });
  });


  // :todo this must be moved to departments
  router.get('/select/:groceryId', function(req, res, next){
    var groceryId = req.params.groceryId;
    var Grocery   = app.models.Grocery;

    Grocery.fetchById(groceryId, function(err, response){
      console.log(response);
      // we don't need response.ingredients. But this is keeped from this method.
      // we'll need to create our own method for this  tasks. :todo
      res.render('pages/select-only-delete-later', {
        user: req.user,
        url: req.url,
        data: response.data,
        groceryId: groceryId
      });

    });


  });

  // router.get('/landosik', function(req, res, next){

  //   res.render('pages/landing', {
  //     user: req.user,
  //     url: req.url,
  //     // data: response
  //   });
  // });


    // [
      //   {"title":"123", "completed":false, "departmentId": "0"},
      //   {"title":"333", "completed":false, "departmentId": "0"},
      //   {"title":"Ingredos", "completed":false, "departmentId": "0"}
      // ]

  // :todo think about making this post instead of get
  // router.get('/getingredients/:groceryId/:departmentId/', 
  router.get('/getingredients/:groceryId/:departmentId/', 
    ensureLoggedIn('/auth/account'),  // :todo get back this 
    function(req, res, next){    
    var Grocery      = app.models.Grocery;
    // var userId    = req.user.id;
    var groceryId    = req.params.groceryId;
    var departmentId = req.params.departmentId;
    
    Grocery.fetchById3(groceryId, function(err, response){
      // console.log(response);
      console.log(response.data[1]);
      
      // console.log(response.data[1].ingredients);
      // _.map(response.data)
      // console.log(response.data[0].ingredients);
      res.json(response.data[1].ingredients);

    });

  });



  router.get('/todo/:groceryId/:departmentId', 
    function(req, res, next){
    var Grocery      = app.models.Grocery;
    // var userId    = req.user.id;
    var groceryId    = req.params.groceryId;
    var departmentId = req.params.departmentId;

    // var departmentId = '59b6e8efbdfb0c292068e55c';

    res.render('pages/grocery3', {
      user        : req.user,
      url         : req.url,
      groceryId   : groceryId,
      departmentId: departmentId
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

        // res.render('pages/index', {
        //     user: req.user,
        //     url: req.url,
        //     data: data, 
        // });

        res.render('pages/landing', {
          user: req.user,
          url: req.url,
          data: data,
          title: "There will be a new title sometime"
          
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