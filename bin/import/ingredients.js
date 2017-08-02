'use strict';

var Ingredient  = server.models.Ingredient;
var relation    = 'ingredients';

function getIngredients(){

	var ingredients = [
  	{ 
  		name: "Asparagus",
  	},
  	{ 
        name: "Broccoli",
    },
    { 
        name: "Carrots",
  	},
  	{  
        name: "Cauliflower",
  	},
    {  
        name: "Celery",
    },
    {  
        name: "Corn",
    },
    {  
        name: "Cucumbers",
    },
    {  
        name: "Lettuce / Greens",
    },
    {  
        name: "Mushrooms",
    },
    {  
        name: "Onions",
    },
    {  
        name: "Peppers",
    },
    {  
        name: "Potatoes",
    },
    {  
        name: "Spinach",
    },
    {  
        name: "Squash",
    },
    {  
        name: "Zucchini",
    },
    {  
        name: "Tomatoes*",
    },

    /////


    {  
        name: "BBQ sauce",
    },
    {  
        name: "Gravy",
    },
    {  
        name: "Honey",
    },
    {  
        name: "Hot sauce",
    },
    {  
        name: "Jam / Jelly / Preserves",
    },
    {  
        name: "Ketchup / Mustard",
    },
    {  
        name: "Pasta sauce",
    },
    {  
        name: "Relish",
    },
    {  
        name: "Salad dressin",
    },
    {  
        name: "Salsa",
    },
    {  
        name: "Soy sauce",
    },
    {  
        name: "Steak sauce",
    },
    {  
        name: "Syrup",
    },
    {  
        name: "Worcestershire sauce",
    },

    //////
    {  
        name: "Butter / Margarine",
    },
    {  
        name: "Cottage cheese",
    },
    {  
        name: "Half & half",
    },
    {  
        name: "Milk",
    },
    {  
        name: "Sour cream",
    },

    {  
        name: "Whipped cream",
    },
    {  
        name: "Yogurt",
    },

    ////
    {  
        name: "Bleu cheese",
    },
    {  
        name: "Cheddar",
    },
    {  
        name: "Cottage cheese",
    },
    {  
        name: "Cream cheese",
    },
    {  
        name: "Feta",
    },
    {  
        name: "Goat cheese",
    },
    {  
        name: "Mozzarella",
    },
    {  
        name: "Parmesan",
    },
    {  
        name: "Provolone",
    },
    {  
        name: "Ricotta",
    },
    {  
        name: "Sandwich slices",
    },
    {  
        name: "Swiss",
    },

    ////
    {  
        name: "Bacon / Sausage",
    },
    {  
        name: "Beef",
    },
    {  
        name: "Chicken",
    },
    {  
        name: "Ground beef / Turkey",
    },
    {  
        name: "Ham / Pork",
    },
    {  
        name: "Hot dogs",
    },
    {  
        name: "Lunchmeat",
    },

    {  
        name: "Turkey",
    },

    /////
    {  
        name: "Catfish",
    },
    {  
        name: "Crab",
    },
    {  
        name: "Lobster",
    },
    {  
        name: "Mussels",
    },
    {  
        name: "Oysters",
    },
    {  
        name: "Salmon",
    },
    {  
        name: "Shrimp",
    },
    {  
        name: "Tilapia",
    },
    {  
        name: "Tuna",
    },
    ///
    {  
        name: "Beer",
    },
    {  
        name: "Club soda / Tonic",
    },
    {  
        name: "Champagne",
    },
    {  
        name: "Gin",
    },
    {  
        name: "Juice",
    },
    {  
        name: "Mixers",
    },
    {  
        name: "Red wine / White wine",
    },
    {  
        name: "Rum",
    },
    {  
        name: "Saké",
    },
    {  
        name: "Soda pop",
    },
    {  
        name: "Sports drink",
    },
    {  
        name: "Whiskey",
    },
    {  
        name: "Vodka",
    },
    ///
    {  
        name: "Bagels / Croissants",
    },
    {  
        name: "Buns / Rolls",
    },
    {  
        name: "Cake / Cookies",
    },
    {  
        name: "Donuts / Pastries",
    },
    {  
        name: "Fresh bread",
    },
    {  
        name: "Pie! Pie! Pie!",
    },
    {  
        name: "Pita bread",
    },
    {  
        name: "Sliced bread",
    },
    ////
    {  
        name:'Baking powder / Soda',
    },
    {  
        name:'Bread crumbs',
    },
    {  
        name:'Cake / Brownie mix',
    },
    {  
        name:'Cake icing / Decorations',
  
    },
    {  
        name:'Chocolate chips / Cocoa',
  
    },
    {  
        name:'Flour',
    },
    {  
        name:'Shortening',
    },
    {  
        name:'Sugar',
    },
    {  
       name:'Sugar substitute',
    },
    {  
        name:'Yeast'
    },
    ///
    {  
        name: "Saké",
    },
    {  
        name: "Saké",
    },
    {  
        name: "Saké",
    },
    {  
        name: "Saké",
    },

    {  
        name: "Saké",
    },
    {  
        name: "Saké",
    },
    {  
        name: "Saké",
    },
    {  
        name: "Saké",
    },
    {  
        name: "Saké",
    },
    {  
        name: "Saké",
    },


	];


	return ingredients;
};


function attachIngredientsToRecipes(ingredients, recipes){

  var first  = ingredients.slice(0, 2);
  var second = ingredients.slice(1, 3);
  console.log(first)  ;
  console.log(second) ;

  var one = idsOnly(first);
  var two = idsOnly(second);

  recipes[0].updateAttribute(relation, one);

  recipes[1].updateAttribute(relation, two);

  console.log(recipes);


  // // only first 10 elements attach
  // var first10  = arrayWithIds.slice(0, 10);
  // var second10 = arrayWithIds.slice(11, 21);

  // recipes.forEach(function(recipe, index){

  //  if (index % 2 === 0){
  //    recipe.updateAttribute('ingredients', first10);
  //  } else {
  //    recipe.updateAttribute('ingredients', second10);
  //  }

  //  // recipe.updateAttribute('ingredients', arrayWithIds);
    
  // });
};


function idsOnly(array){

  var result = Object.keys(array).map(function(e) {
    return array[e].id;
    });

  return result;    

};

function createIngredients(cb){
  database.automigrate('Ingredient', function(err){
    if (err) return cb(err);

    Ingredient.create(getIngredients(), cb);
  });
};

module.exports.attachIngredientsToRecipes = attachIngredientsToRecipes;
module.exports.createIngredients = createIngredients;