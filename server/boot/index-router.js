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





  router.get('/tatypidor/:groceryId', 
    ensureLoggedIn('/auth/account'), 
    function(req, res, next){    
    var Grocery   = app.models.Grocery;
    var userId    = req.user.id;
    var groceryId = req.params.groceryId;
    
    // var groceryId = '59aebf4832e8fb1c105968f9';

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
        data: response.data
      });

    });


    // :todo update this later
    // Grocery.withDepartments(groceryId, function(err, grocery){
    //   // console.log(grocery);

    //   var g = grocery.toJSON();
      
    //   let arr = _.map(grocery.hideThisIds, item => item.toString());

    //     var uniques = _.map(_.groupBy(g.ingredients, function(item){
    //       // console.log(item);             
    //       return item.department.id.toString();
    //     }), function(grouped){

    //       var departmentId = grouped[0].departmentId.toString();
    //       var flag = _.contains(arr, departmentId);
          

    //      var ja = _.map(grouped, function(item){
    //       return [
    //           item.id, 
    //           item.name,
    //           '/del/ing/' + item.id + '/' + g.id
    //       ] // :todo change this to an object
    //      });          

    //       if ( !flag ) { 

    //         return false;

    //       }

    //       return { id: grouped[0].department.id.toString(),
    //                 name: grouped[0].department.name,
    //                 type: grouped[0].department.type,
    //                 ingredients: ja,                        
    //             };
            

    //     });


    //     console.log(uniques);


    // })

    // Grocery.showAllDepartments(options);

    
  });

 router.get('/sortable', function(req, res, next){

    res.render('pages/grocery2', {
      user: req.user,
      url: req.url,
      // data: response
    });
  });






  // router.get('/landosik', function(req, res, next){

  //   res.render('pages/landing', {
  //     user: req.user,
  //     url: req.url,
  //     // data: response
  //   });
  // });

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