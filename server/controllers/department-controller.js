'use strict';


const path      = require('path');
// var validator = require('express-validator');

let app        = require(path.resolve(__dirname, '../server'));
const async      = require('async');
const _ = require('underscore');
var Department = app.models.Department;
var Grocery    = app.models.Grocery;
// var Video     = server.models.VideoModel;
// var Example   = server.models.ExampleModel;

// :todo make it more lightWeight
// :todo some of fucntionality are duplicated
exports.departmentsList = async (req, res, next) => {

	var groceryId = req.params.groceryId;
		
	var Grocery   = app.models.Grocery;

	let grocery
  let response
  try {      
     var Grocery   = app.models.Grocery;
     // grocery = await Grocery.fetchById(groceryId);
     grocery  = await Grocery.findById(groceryId, Grocery.query1());
     response = Grocery.convertCollectionData(grocery);
     // console.log(response);

  } catch (e) {
    //this will eventually be handled by your error handling middleware
    next(e) 
  }

  // departments: response.data,
  var renderObject = {
    name: response.name + '`s Departments',     

    departments : response.data,    
    // description : d.desc,
    groceryId   : groceryId
  };

  // console.log(renderObject)

      
  res.render('pages/departmentsshow', renderObject);

};

exports.deleteDepartment = async (req, res, next) => {

  var departmentId = req.params.id;
  var groceryId    = req.params.groceryId;

  var Grocery      = app.models.Grocery;
    
  

    // :todo update things. This is a duplicated code
    Grocery.findById(groceryId, {
      include: {
        relation: 'ingredients',
        scope: {
          where: {
            departmentId: departmentId
          }
        }
      }

    }, function(err, grocery){

      console.log(grocery);

      var g = grocery.toJSON();

      var toRemove = _.pluck(g.ingredients, 'id');
      toRemove     = _.map(toRemove, item => item.toString());

      console.log(toRemove);



      var options = {
          groceryId: groceryId,
          secondArray: toRemove
        };
            
      Grocery.removeIngredient(options);

      // Grocery.removeRemoveDepartment(options);

    });

    res.redirect('/view/grocery/' + groceryId);

};

//:todo decide which method is better - grocery version or controller version
exports.getDepartment = async (req, res, next) => {

  var departmentId = req.params.id;
  var groceryId    = req.params.groceryId;

  let department
  let response
  try {      
     // var Grocery   = app.models.Grocery;
     // grocery = await Grocery.fetchById(groceryId);

     department = await Department.findById(departmentId, Department.queryOne());
     response   = Department.convertData(department);
     // console.log(response);

     // grocery  = await Grocery.findById(groceryId, Grocery.query1());
     // response = Grocery.convertCollectionData(grocery);
     // console.log(response);

  } catch (e) {
    //this will eventually be handled by your error handling middleware
    next(e) 
  }

  let grocery
  try {      
     // var Grocery   = app.models.Grocery;
     grocery = await Grocery.fetchById(groceryId);
     console.log(grocery);
     // let arr     = _.map(grocery.hideThisIds, item => item.toString());
     // console.log(arr);
     // department = await Department.getOne(departmentId);
     // response   = Department.convertData(department);
     // console.log(response);

     // grocery  = await Grocery.findById(groceryId, Grocery.query1());
     // response = Grocery.convertCollectionData(grocery);
     // console.log(response);

  } catch (e) {
    //this will eventually be handled by your error handling middleware
    next(e) 
  }
  // console.log(d.ingredients);

  // var renderObject = {
    
  //   departmentId:  d.id, // :change that
      
        
  //   description : d.desc,
  //   groceryId   : groceryId,

  //   data : d
  // };
  // res.render('pages/department', renderObject);



};
// Fancy console.log
function output (err, data) {
  console.dir (err || data, {
    depth: null,
    colors: true
  });
}
