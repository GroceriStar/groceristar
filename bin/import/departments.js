'use strict';


var Department  = server.models.Department;
var relation1    = 'departmentId';
var relation2    = 'departmentIds';


function getDepartments(){

[
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	''
];

	var departments = [
		{
	
		 name: "Fresh vegetables",
		 type: 'food'
		},
		{
	
		 name: "Condiments / Sauces",
		 type: 'food'
		},
		{
	
		 name: "Dairy",
		 type: 'food'
		},{
	
		 name: "Cheese",
		 type: 'food'
		},{
	
		 name: "Meat",
		 type: 'food'
		},{
	
		 name: "Seafood",
		 type: 'food'
		},{
	
		 name: "Beverages",
		 type: 'food'
		},{
	
		 name: "Baked goods",
		 type: 'food'
		},{
	
		 name: "Baking",
		 type: 'food'
		},{
	
		 name: "Snacks",
		 type: 'food'
		},{
	
		 name: "Themed meals",
		 type: 'food'
		},{
	
		 name: "Baby stuff",
		 type: 'non-food'
		},{
	
		 name: "Pets",
		 type: 'non-food'
		},{
	
		 name: "Fresh fruits",
		 type: 'food'
		},{
	
		 name: "Refrigerated items",
		 type: 'food'
		},{
	
		 name: "Frozen",
		 type: 'food'
		},{
	
		 name: "Various groceries",
		 type: 'food'
		},{
	
		 name: "Canned foods",
		 type: 'food'
		},{
	
		 name: "Spices & herbs",
		 type: 'food'
		},{
	
		 name: "Personal care",
		 type: 'household'
		},{
	
		 name: "Medicine",
		 type: 'household'
		},{
	
		 name: "Kitchen",
		 type: 'household'
		},{
	
		 name: "Other",
		 type: 'household'
		},{
	
		 name: "Cleaning products",
		 type: 'household'
		},{
	
		 name: "Office supplies",
		 type: 'household'
		},{
	
		 name: "Carcinogens",
		 type: 'household'
		},{
	
		 name: "Other stuff",
		 type: 'household'
		},{
	
		 name: "To-do list",
		 type: 'household'
		}
	];

	return departments;

};

function createDepartments(cb){
	database.autoupdate('Department', function(err){
		if (err) return cb(err);

		Department.create(getDepartments(), cb);
	
	});
};


function attachDepartmentsToIngredients(departments, ingredients){

	var first  = ingredients.slice(0, 2);
	var second = ingredients.slice(1, 3);
	// console.log(ingredients.splice(2, 4));
	// console.log(ingredients.splice(2, 2));


	var arrayWithIds = idsOnly(departments);

	// console.log(arrayWithIds[0]);
	// console.log(arrayWithIds[1]);
	// console.log(arrayWithIds[2]);
	
	first.forEach(function(ingredient){
		ingredient.updateAttribute(relation1, arrayWithIds[0]);
	});

	second.forEach(function(ingredient){
		ingredient.updateAttribute(relation1, arrayWithIds[1]);
	});



	// console.log(first);
	// console.log(second);

};

function attachDepartmentsToGroceries(departments, groceries){
	var arrayWithIds = idsOnly(departments);

	groceries.forEach(function(grocery){
		grocery.updateAttribute(relation2, arrayWithIds);
		
	});
	// console.log(groceries);
};

module.exports.createDepartments = createDepartments;
module.exports.attachDepartmentsToIngredients = attachDepartmentsToIngredients;
module.exports.attachDepartmentsToGroceries = attachDepartmentsToGroceries