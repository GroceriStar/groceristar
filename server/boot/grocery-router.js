'use strict';

const request        = require('request');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

const async          = require('async');
const _              = require('underscore');

module.exports = function(app) {
  var router  = app.loopback.Router();
  var groceryController = require('../controllers/grocery-controller');
  

 //:todo add relations and display whole information about 
 //:todo make it more protected from view
  router.get('/view/grocery/:groceryId', 
    ensureLoggedIn('/auth/account'),
    groceryController.viewGrocery);




 router.get('/view/grocery/hidden/:groceryId',
  ensureLoggedIn('/auth/account'),
  function(req, res, next){
    var Grocery   = app.models.Grocery;
    var groceryId = req.params.groceryId;

    // only hidden departments will be diplsayed
    Grocery.fetchById2(groceryId, function(err, response){

      // console.log(response);
      
      // :todo make all data came from method
      res.render('pages/grocery', {
          name: 'Hidden departments of ' + response.name,
          departments: response.data, // [data>> department >> ingredient]
          groceryId: groceryId,
          messages: {},

      });  

    });

  });



  router.get('/auth/attach-grocery-to-user/:groceryId', 
    ensureLoggedIn('/auth/account'), 
    function(req, res, next) {
    var groceryId = req.params.groceryId;
    var userId    = req.user.id;
    var User      = app.models.user;
    var Grocery   = app.models.Grocery;

    // this is a duplicated function from Grocery :todo think about it, real talk   
    var options = {
      userId: userId,
      secondArray: [ groceryId ]
    };
    User.addGrocery(options);
    // User.proceed(options);

    res.redirect('/auth/account');
  });


 
 router.get('/remove/grocery/:groceryId', 
  ensureLoggedIn('/auth/account'), 
  groceryController.removeGrocery);



  router.get('/clone/:groceryId', groceryController.cloneGrocery);

  router.post('/cloneform', groceryController.cloneForm);

  router.get('/afterclone', groceryController.justRedirect);



// :todo finish
 router.get('create-new-grocery', 
  ensureLoggedIn('/auth/account'), 
  groceryController.createNewGrocery);


// :todo finish Not used functionality right now
 router.get('/view/groceries', 
  ensureLoggedIn('/auth/account'), 
  function(req, res, next){
    var userId    = req.user.id;    
    var User      = app.models.user;

    User.methodofAllMethods(userId, function(err, data){
      // console.log(data);
      res.render('pages/grocery-list', {
        title: 'GrocerIES ATTACHED TO THIS USER ' + userId, //:todo update that
        // url: req.url,
        messages: {},
        groceries: data.response,

      }); 

    });

 });


 // Change Grocery Name functionality

 router.get('/change/grocery/name/:groceryId', 
  ensureLoggedIn('/auth/account'), 
  groceryController.changeName);


  // Update grocery list name
  router.post('/update/name', groceryController.postUpdateName);





  router.get('/shopping/:groceryId/:departmentId', 
    function(req, res, next){
    var Grocery      = app.models.Grocery;
    // var userId    = req.user.id;
    var groceryId    = req.params.groceryId;
    var departmentId = req.params.departmentId;

    var Department   = app.models.Department;

    Grocery.findById(groceryId, Grocery.queryOneDepartment(departmentId), (err, res)=>{

      console.log(res);
console.log('-----');
    });

    


    
    Grocery.fetchById(groceryId, function(err, response){

      console.log(response.data);
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

      res.render('pages/shopping/shopping-list', {
        user        : req.user,
        url         : req.url,
        groceryId   : groceryId,
        departmentId: departmentId,
        name        : currentDepartmentCollection.name,
        departments: departments

      });

    });

    
  });

  app.use(router);

};