'use strict';

const debug   = require('debug');
const gf = require('@groceristar/groceristar-fetch');

let table_name = 'Ingredient'

const get = (departments) => {

    var data     = gf.getIngredients();

  	return data;

};




// nt used cause GS updated their structure
// function attachDepartmentsToIngredients(departments, ingredients){

// 	// 	ingredient.updateAttribute(relation1, arrayWithIds[0]);


//@TODO replace with the latst veersion
//const attachDepartmentsToIngredients = (departments, ingredients, cb) => {
//  attach(departments, ingredients, cb);
//};

//const attachDepartmentsToIngredients = (departments, ingredients, cb) => {
//  attach(departments, ingredients, cb);
//};

//
module.exports.get   = get;
module.exports.table_name   = table_name;
