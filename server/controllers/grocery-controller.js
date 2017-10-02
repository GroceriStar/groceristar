'use strict';


const path    = require('path');

let app       = require(path.resolve(__dirname, '../server'));

var async   = require('async');

const Grocery = app.models.Grocery;
const User    = app.models.user;
// var Video     = server.models.VideoModel;
// var Example   = server.models.ExampleModel;

exports.changeName = (req, res, next) => {

    var Grocery = app.models.Grocery;
    var groceryId = req.params.groceryId;

    res.render('pages/change-grocery-list-name', {});

};

// :todo duplicated stuff
exports.postUpdateName = (req, res, next) => {
	var groceryId = req.body.groceryId;
  var name      = req.body.name;
  var Grocery   = app.models.Grocery;

  Grocery.findById(groceryId, {}, function(err, model){
    model.updateAttribute('name', name);
    res.redirect('/auth/account');
  });
};

exports.cloneGrocery = async (req, res, next) => {
    var userId    = req.user.id;    
    var groceryId = req.params.groceryId;  
    
    let grocery
    try {
      grocery = await Grocery.findById(groceryId, Grocery.queryNotHidden());

    } catch (e) {
        //this will eventually be handled by your error handling middleware
        next(e) 
    }

    let cloned
    try {   
      var newObject = Grocery.getObjectForClone(grocery);
      cloned = await Grocery.create(newObject);

    } catch (e) {
        //this will eventually be handled by your error handling middleware
        next(e) 
    }

    var options = {
      type  : 'attach',
      field : 'groceryIds',
      userId: userId,
      secondArray: [ cloned.id ]
    };
    User.proceed(options);

    res.redirect('/afterclone');
};

exports.cloneForm = async (req, res, next) => {

  var groceryId = req.body.groceryId;
  var userId    = req.body.userId;
  var name      = req.body.name;
  // var Grocery   = app.models.Grocery;

  // Grocery.findById(groceryId, {}, function(err, model){
  //   model.updateAttribute('name', name);
  //   // res.redirect('/auth/account');
  // });
    let grocery
    try {
      grocery = await Grocery.findById(groceryId, Grocery.queryNotHidden());

    } catch (e) {
        //this will eventually be handled by your error handling middleware
        next(e) 
    }

    let cloned
    try {   
      var newObject = Grocery.getObjectForClone(grocery);
      // console.log(newObject);
      newObject.name = name;
      cloned = await Grocery.create(newObject);
      console.log(cloned);
      console.log(userId)
    } catch (e) {
        //this will eventually be handled by your error handling middleware
        next(e) 
    }

    var options = {
      type  : 'attach',
      field : 'groceryIds',
      userId: userId,
      secondArray: [ cloned.id ]
    };
    User.proceed(options);

    res.redirect('/afterclone');


  // res.redirect('/afterclone');
};

exports.justRedirect = (req, res, next) => {
  res.redirect('/auth/account');
};

exports.createNewGrocery = (req, res, next) => {
    // console.log( req.user.id );
    var Grocery = app.models.Grocery;
    var data = {
      title: data.title,
      desc:  data.desc,
      slug:  '',
      img :  '',
      // departmentIds: [], // not sure if we need this
      // hideThisIds:   [],
    }
    Grocery.createnew(req.user.id, data, function(){});
    // res.redirect('/');
};


exports.removeGrocery = (req, res, next) => {

  var groceryId = req.params.groceryId;
  var userId    = req.user.id;    
  
  var Grocery   = app.models.Grocery;
  var User   = app.models.user;

  // this is a duplicated function from Grocery :todo think about it, real talk   
  var options = {
    type  : 'detach',
    field : 'groceryIds',
    userId: userId,
    secondArray: [ groceryId ]
  };
  User.proceed(options);

  Grocery.destroyById(groceryId, function(err){});
  res.redirect('/auth/account');

};

exports.viewGrocery = async (req, res, next) => {



};

// Fancy console.log
function output (err, data) {
  console.dir (err || data, {
    depth: null,
    colors: true
  });
}