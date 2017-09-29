'use strict';


const path      = require('path');
// var validator = require('express-validator');

let app    = require(path.resolve(__dirname, '../server'));
var async   = require('async');
// var Video     = server.models.VideoModel;
// var Example   = server.models.ExampleModel;

// :todo make it more lightWeight
// :todo some of fucntionality are duplicated
exports.departmentsList = async (req, res, next) => {

	var groceryId = req.params.groceryId;
		
	var Grocery   = app.models.Grocery;

	let grocery
      try {      
         var Grocery   = app.models.Grocery;
         // grocery = await Grocery.fetchById(groceryId);
         grocery  = await Grocery.findById(groceryId, Grocery.query1());
         response = Grocery.convertCollectionData(grocery);


      } catch (e) {
        //this will eventually be handled by your error handling middleware
        next(e) 
      }

// departments: response.data,
res.render('pages/change-grocery-list-name', {});

};

// Fancy console.log
function output (err, data) {
  console.dir (err || data, {
    depth: null,
    colors: true
  });
}
