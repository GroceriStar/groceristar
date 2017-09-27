'use strict';


const path      = require('path');
// var validator = require('express-validator');

let app    = require(path.resolve(__dirname, '../server'));
var Grocery   = app.models.Grocery;
// var Video     = server.models.VideoModel;
// var Example   = server.models.ExampleModel;

exports.changeName = (req, res, next) => {

    // var Grocery = app.models.Grocery;
    var groceryId = req.params.groceryId;

    res.render('pages/change-grocery-list-name', {});

};

exports.postUpdateName = (req, res, next) => {
	var groceryId = req.body.groceryId;
    var name      = req.body.name;
    // var Grocery   = app.models.Grocery;

    Grocery.findById(groceryId, {}, function(err, model){
      model.updateAttribute('name', name);
      res.redirect('/auth/account');
    });
};

exports.cloneGrocery = (req, res, next) => {
    var userId    = req.user.id;    
    var groceryId = req.params.groceryId;  
    // var Grocery   = app.models.Grocery;
    // console.log(typeof userId);
    Grocery.cloner( groceryId, userId );

    res.redirect('/auth/account');
};

exports.createNewGrocery = (req, res, next) => {
    // console.log( req.user.id );
    // var Grocery = app.models.Grocery;
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


// Fancy console.log
function output (err, data) {
  console.dir (err || data, {
    depth: null,
    colors: true
  });
}
