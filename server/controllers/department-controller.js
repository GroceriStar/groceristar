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
    name: response.name,     

    departments : response,    
    // description : d.desc,
    groceryId   : groceryId
  };

  console.log(renderObject)

      
  // res.render('pages/change-grocery-list-name', renderObject);

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

// Fancy console.log
function output (err, data) {
  console.dir (err || data, {
    depth: null,
    colors: true
  });
}
