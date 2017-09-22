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


  // router.get('/home', function(req, res, next){

  //   res.render('pages/home', {
  //     user: req.user,
  //     url: req.url,
  //     // data: response
  //   });
  // });

 // router.get('/sortable', function(req, res, next){

 //    res.render('pages/grocery2', {
 //      user: req.user,
 //      url: req.url,
 //      // data: response
 //    });
 //  });




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
        departments: response.data,
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

  router.get('/credits', function(req, res, next){

      res.render('pages/credits', {
        user        : req.user,
        url         : req.url,
      });

  });

  router.get('/todo/:groceryId/:departmentId', 
    function(req, res, next){
    var Grocery      = app.models.Grocery;
    // var userId    = req.user.id;
    var groceryId    = req.params.groceryId;
    var departmentId = req.params.departmentId;

    var Department   = app.models.Department;


    Grocery.fetchById(groceryId, function(err, response){

      // console.log(response.data);
      // _.pluck(response.data, function(item){
      //   console.log(item);
      // });

      // :todo remove ingredients from this list.
      // but this will cause issue in select field
      var departments = _.map(response.data, function(obj) { 
        // maybe it'll be better to just from an object by hands
        return _.pick(obj, 'id', 'name', 'type', 'ingredients'); 
      });

      var currentDepartmentCollection = _.where(response.data, {id:departmentId});
      currentDepartmentCollection = currentDepartmentCollection[0];

      // console.log( _.where(response.data, {id:departmentId}) );

      res.render('pages/grocery3', {
        user        : req.user,
        url         : req.url,
        groceryId   : groceryId,
        departmentId: departmentId,
        name        : currentDepartmentCollection.name,
        departments: departments

      });

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
        // console.log(UserExtended);

    });


    

    





  });


  //  app.use(function(req, res, next) {
  //   res.status(404).send('Sorry cant find that!');
  // });

  app.use(router);

};