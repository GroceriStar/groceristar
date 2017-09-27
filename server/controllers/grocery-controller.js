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


// Fancy console.log
function output (err, data) {
  console.dir (err || data, {
    depth: null,
    colors: true
  });
}
