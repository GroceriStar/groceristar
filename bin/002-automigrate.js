
var path     = require('path');

let app      = require(path.resolve(__dirname, '../server/server'));
var database = app.datasources.searchDS;


var lbTables = [
  'Attribute',
  'Department',
	'Ingredient',

  'Recipe'
];

//creating loopback necessary tables if no exists
database.automigrate(lbTables, function(err) {
  if (err) throw err;

  console.log( 'Loopback tables [' + lbTables.toString() + '] created in ' + database.adapter.name );
  database.disconnect();

  // process.on('exit', function(code) {
  // 	return console.log(`Automigrate is competed`);
  // });
  // process.exit(22);
});
