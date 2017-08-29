'use strict';

var request        = require('request');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;


// var loopback = require('loopback');




module.exports = function(app) {

  var router  = app.loopback.Router();


  router.get('/home', function(req, res, next){

    res.render('pages/home', {
      user: req.user,
      url: req.url,
      data: response
    });
  });

  router.get('/todo', function(req, res, next){

    res.render('pages/grocery2', {
      user: req.user,
      url: req.url,
      data: response
    });
  });



  router.get('/', function(req, res, next) {

    var Grocery = app.models.Grocery;


    Grocery.fetch(function(error, response){

        // console.log(response);

          res.render('pages/index', {
            user: req.user,
            url: req.url,
            data: response, //:todo change this names
            departments: response.departments
          });


          // res.render('pages/grocery2', {
          //   user: req.user,
          //   url: req.url,
          //   data: response
          // });


          // res.render('pages/home', {
          //   user: req.user,
          //   url: req.url,
          //   data: response
          // });


          // res.render('pages/dashboard', {
          //   user: req.user,
          //   url: req.url,
          //   data: response
          // });

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
              // console.log(model);
              // console.log(model.groceryIds);

              Grocery.find({
                where: {id: { inq:model.groceryIds }}
              }).then(function(models){


                // console.log(models);


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


  router.get('/clone/:groceryId', function(req, res, next) {

    console.log( req.params.groceryId );
    console.log( req.user.id );

    var Grocery = app.models.Grocery;
    Grocery.clone( req.params.groceryId, req.user.id, function(){

    });

    // res.redirect('/');
  });









 router.get('create-new-grocery', 
  ensureLoggedIn('/auth/account'), function(req, res, next){

    console.log( req.user.id );
    var Grocery = app.models.Grocery;
    var data = {
      title: data.title,
      desc:  data.desc,
      slug:  '',
      img :  '',
      // departmentIds: [], //not sure if we need this
      // hideThisIds:   [],
    }
    Grocery.createnew(req.user.id, data, function(){});

 });


 

  app.use(router);

};