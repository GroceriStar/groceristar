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
      // data: response
    });
  });

  router.get('/pidor/update', function(req, res, next){
    console.log(req.params);
  });
  router.get('/pidor/create', function(req, res, next){
    console.log(req.params);
  });

  router.get('/tatypidor', function(req, res, next){
    
    res.json([
      {"title":"123","completed":false},
      {"title":"333","completed":false},
      {"title":"sam ty pidor."}
      ]);

  });

  router.get('/todo', function(req, res, next){

    res.render('pages/grocery2', {
      user: req.user,
      url: req.url,
      // data: response
    });
  });






  router.get('/', function(req, res, next) {
    var Grocery = app.models.Grocery;


    Grocery.fetch(function(error, response){

        // console.log(response);

          res.render('pages/index', {
            user: req.user,
            url: req.url,
            data: response, // :todo change this names
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















 

  app.use(router);

};