'use strict';

var path     = require('path');

let app      = require(path.resolve(__dirname, '../server/server'));
var database = app.datasources.recipeDS;

var lbTables = [
	'User', 'accessToken', 'ACL', 'RoleMapping',
	'Role', 
	
	// custom tables
	'user', 'userCredential', 'userIdentity', 'IngredientModel',
	'GroceryModel', 'DepartmentModel', 

];

//creating loopback necessary tables if no exists
database.automigrate(lbTables, function(err) {
  if (err) throw err;

  console.log( 'Loopback tables [' + lbTables.toString() + '] created in ' + database.adapter.name );
  database.disconnect();
});
