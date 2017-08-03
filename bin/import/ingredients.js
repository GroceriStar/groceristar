'use strict';

var path        = require('path');
let server      = require(path.resolve(__dirname, '../../server/server'));
var database    = server.datasources.groceryDS;

var Ingredient  = server.models.Ingredient;
var relation    = 'ingredients';

function getIngredients(departments){

	var ingredients = [
  	{ 
  		name: "Asparagus",
        departmentId: departments[].id
  	},
  	{ 
        name: "Broccoli",
        departmentId: departments[].id
    },
    { 
        name: "Carrots",
        departmentId: departments[].id
  	},
  	{  
        name: "Cauliflower",
        departmentId: departments[].id
  	},
    {  
        name: "Celery",
        departmentId: departments[].id
    },
    {  
        name: "Corn",
        departmentId: departments[].id
    },
    {  
        name: "Cucumbers",
        departmentId: departments[].id
    },
    {  
        name: "Lettuce / Greens",
        departmentId: departments[].id
    },
    {  
        name: "Mushrooms",
        departmentId: departments[].id
    },
    {  
        name: "Onions",
        departmentId: departments[].id
    },
    {  
        name: "Peppers",
        departmentId: departments[].id
    },
    {  
        name: "Potatoes",
        departmentId: departments[].id
    },
    {  
        name: "Spinach",
        departmentId: departments[].id
    },
    {  
        name: "Squash",
        departmentId: departments[].id
    },
    {  
        name: "Zucchini",
        departmentId: departments[].id
    },
    {  
        name: "Tomatoes*",
        departmentId: departments[].id
    },

    /////


    {  
        name: "BBQ sauce",
        departmentId: departments[].id
    },
    {  
        name: "Gravy",
        departmentId: departments[].id
    },
    {  
        name: "Honey",
        departmentId: departments[].id
    },
    {  
        name: "Hot sauce",
        departmentId: departments[].id
    },
    {  
        name: "Jam / Jelly / Preserves",
        departmentId: departments[].id
    },
    {  
        name: "Ketchup / Mustard",
        departmentId: departments[].id
    },
    {  
        name: "Pasta sauce",
        departmentId: departments[].id
    },
    {  
        name: "Relish",
        departmentId: departments[].id
    },
    {  
        name: "Salad dressin",
        departmentId: departments[].id
    },
    {  
        name: "Salsa",
        departmentId: departments[].id
    },
    {  
        name: "Soy sauce",
        departmentId: departments[].id
    },
    {  
        name: "Steak sauce",
        departmentId: departments[].id
    },
    {  
        name: "Syrup",
        departmentId: departments[].id
    },
    {  
        name: "Worcestershire sauce",
        departmentId: departments[].id
    },

    //////
    {  
        name: "Butter / Margarine",
        departmentId: departments[].id
    },
    {  
        name: "Cottage cheese",
        departmentId: departments[].id
    },
    {  
        name: "Half & half",
        departmentId: departments[].id
    },
    {  
        name: "Milk",
        departmentId: departments[].id
    },
    {  
        name: "Sour cream",
        departmentId: departments[].id
    },

    {  
        name: "Whipped cream",
        departmentId: departments[].id
    },
    {  
        name: "Yogurt",
        departmentId: departments[].id
    },

    ////
    {  
        name: "Bleu cheese",
        departmentId: departments[].id
    },
    {  
        name: "Cheddar",
        departmentId: departments[].id
    },
    {  
        name: "Cottage cheese",
        departmentId: departments[].id
    },
    {  
        name: "Cream cheese",
        departmentId: departments[].id
    },
    {  
        name: "Feta",
        departmentId: departments[].id
    },
    {  
        name: "Goat cheese",
        departmentId: departments[].id
    },
    {  
        name: "Mozzarella",
        departmentId: departments[].id
    },
    {  
        name: "Parmesan",
        departmentId: departments[].id
    },
    {  
        name: "Provolone",
        departmentId: departments[].id
    },
    {  
        name: "Ricotta",
        departmentId: departments[].id
    },
    {  
        name: "Sandwich slices",
        departmentId: departments[].id
    },
    {  
        name: "Swiss",
        departmentId: departments[].id
    },

    ////
    {  
        name: "Bacon / Sausage",
        departmentId: departments[].id
    },
    {  
        name: "Beef",
        departmentId: departments[].id
    },
    {  
        name: "Chicken",
        departmentId: departments[].id
    },
    {  
        name: "Ground beef / Turkey",
        departmentId: departments[].id
    },
    {  
        name: "Ham / Pork",
        departmentId: departments[].id
    },
    {  
        name: "Hot dogs",
        departmentId: departments[].id
    },
    {  
        name: "Lunchmeat",
        departmentId: departments[].id
    },

    {  
        name: "Turkey",
        departmentId: departments[].id
    },

    /////
    {  
        name: "Catfish",
        departmentId: departments[].id
    },
    {  
        name: "Crab",
        departmentId: departments[].id
    },
    {  
        name: "Lobster",
        departmentId: departments[].id
    },
    {  
        name: "Mussels",
        departmentId: departments[].id
    },
    {  
        name: "Oysters",
        departmentId: departments[].id
    },
    {  
        name: "Salmon",
        departmentId: departments[].id
    },
    {  
        name: "Shrimp",
        departmentId: departments[].id
    },
    {  
        name: "Tilapia",
        departmentId: departments[].id
    },
    {  
        name: "Tuna",
        departmentId: departments[].id
    },
    ///
    {  
        name: "Beer",
        departmentId: departments[].id
    },
    {  
        name: "Club soda / Tonic",departmentId: departments[].id
    },
    {  
        name: "Champagne",departmentId: departments[].id
    },
    {  
        name: "Gin",departmentId: departments[].id
    },
    {  
        name: "Juice",departmentId: departments[].id
    },
    {  
        name: "Mixers",departmentId: departments[].id
    },
    {  
        name: "Red wine / White wine",departmentId: departments[].id
    },
    {  
        name: "Rum",departmentId: departments[].id
    },
    {  
        name: "Saké",departmentId: departments[].id
    },
    {  
        name: "Soda pop",departmentId: departments[].id
    },
    {  
        name: "Sports drink",departmentId: departments[].id
    },
    {  
        name: "Whiskey",departmentId: departments[].id
    },
    {  
        name: "Vodka",departmentId: departments[].id
    },
    ///
    {  
        name: "Bagels / Croissants",departmentId: departments[].id
    },
    {  
        name: "Buns / Rolls",departmentId: departments[].id
    },
    {  
        name: "Cake / Cookies",departmentId: departments[].id
    },
    {  
        name: "Donuts / Pastries",departmentId: departments[].id
    },
    {  
        name: "Fresh bread",departmentId: departments[].id
    },
    {  
        name: "Pie! Pie! Pie!",departmentId: departments[].id
    },
    {  
        name: "Pita bread",departmentId: departments[].id
    },
    {  
        name: "Sliced bread",departmentId: departments[].id
    },
    ////
    {  
        name:'Baking powder / Soda',departmentId: departments[].id
    },
    {  
        name:'Bread crumbs',departmentId: departments[].id
    },
    {  
        name:'Cake / Brownie mix',departmentId: departments[].id
    },
    {  
        name:'Cake icing / Decorations',departmentId: departments[].id
  
    },
    {  
        name:'Chocolate chips / Cocoa',departmentId: departments[].id
  
    },
    {  
        name:'Flour',departmentId: departments[].id
    },
    {  
        name:'Shortening',departmentId: departments[].id
    },
    {  
        name:'Sugar',departmentId: departments[].id
    },
    {  
       name:'Sugar substitute',departmentId: departments[].id
    },
    {  
        name:'Yeast',departmentId: departments[].id
    },
    ///
    {  
        name:'Candy / Gum',departmentId: departments[].id
    },
    {  
        name:'Cookies',departmentId: departments[].id
    },
    {  
           name:'Crackers',departmentId: departments[].id
    },
    {  
         name:'Dried fruit',departmentId: departments[].id
    },

    {  
         name:'Granola bars / Mix',departmentId: departments[].id
    },
    {  
        name:'Nuts / Seeds',departmentId: departments[].id
    },
    {  
       name: 'Oatmeal',departmentId: departments[].id
    },
    {  
        name:'Popcorn',departmentId: departments[].id
    },
    {  
       name:'Potato / Corn chips',departmentId: departments[].id
    },
    {  
         
      name:'Pretzels',departmentId: departments[].id
    },
    ////
    {  
         
      name:'Burger night',departmentId: departments[].id
    },
    {  
         
      name:'Chili night',departmentId: departments[].id
    },
    {  
         
      name:'Pizza night',departmentId: departments[].id
    },
    {  
         
     name:'Spaghetti night',departmentId: departments[].id
    },
    {  
         
      name:'Taco night',departmentId: departments[].id
    },
    {  
     name:'Take-out deli food',departmentId: departments[].id
    },
    {  
         
     name:'Baby food',departmentId: departments[].id
    },
    {  
         
     name:'Diapers',departmentId: departments[].id
    },
    {  
         
        name:'Formula',departmentId: departments[].id
    },
    {  
         
      name:'Lotion',departmentId: departments[].id
    },
    {  
         
      name:'Baby wash',departmentId: departments[].id
    },
    {  
         
     name:'Wipes',departmentId: departments[].id
    },
    ///
    {  
       name:'Cat food / Treats',departmentId: departments[].id
    },
    {  
         
      name:'Cat litter',departmentId: departments[].id
    },
    {  
         
      name:'Dog food / Treats',departmentId: departments[].id
    },
    {  
     name:'Flea treatment',departmentId: departments[].id
    },
    {  
         
      name:'Pet shampoo',departmentId: departments[].id
    },
//////
    {  
         
     name:'Apples',departmentId: departments[].id
    },
    {  
         
     name:'Avocados',departmentId: departments[].id
    },

    {  
     name:'Bananas',departmentId: departments[].id
    },
    {  
         
    name:'Berries',departmentId: departments[].id
    },

    {  
         
      name:'Cherries',departmentId: departments[].id
    },
    {  
         
     name:'Grapefruit',departmentId: departments[].id
    },
    {  
     name:'Grapes',departmentId: departments[].id
    },
    {  
      name:'Kiwis',departmentId: departments[].id
    },
    {  
         name:'Lemons / Limes',departmentId: departments[].id
    },

    {  
        name:'Melon',departmentId: departments[].id
    },
    {  
    name:'Nectarines',departmentId: departments[].id
    },
    {  
       name:'Oranges',departmentId: departments[].id
    },
    {  
         
     name:'Peaches',departmentId: departments[].id
    },

    {      
      name:'Pears',departmentId: departments[].id
    },
    {  
         
  name:'Plums',departmentId: departments[].id
    },
    ////////
    {  
         
      name:'Bagels',departmentId: departments[].id
    },
    {  
         
     name:'Chip dip',departmentId: departments[].id
    },
    {  
         
      name:'Eggs / Fake eggs',departmentId: departments[].id
    },
    {  
         
     name:'English muffins',departmentId: departments[].id
    },
    {  
         
   name:'Fruit juice',departmentId: departments[].id
    },
    {  
        
  name:'Hummus',departmentId: departments[].id
    },
    {  
        name:'Ready-bake breads',departmentId: departments[].id
    },
    {  
         name:'Tofu',departmentId: departments[].id
    },
    {  
        
  name:'Tortillas',departmentId: departments[].id
    },
    ///
    {  
     name:'Breakfasts',departmentId: departments[].id
    },
    {  
      name:'Burritos',departmentId: departments[].id
    },
    {  
      
  name:'Fish sticks',departmentId: departments[].id
    },
    {  
      name:'Fries / Tater tots',departmentId: departments[].id
    },
    {  
      name:'Ice cream / Sorbet',departmentId: departments[].id
    },
    {  
        name:'Juice concentrate',departmentId: departments[].id
    },
    {  
     name:'Pizza',departmentId: departments[].id
    },
    {  
      name:'Pizza Rolls',departmentId: departments[].id
    },{  
      name:'Popsicles',departmentId: departments[].id
    },{  
      
  name:'TV dinners',departmentId: departments[].id
    },
    {  
       
  name:'Vegetables',departmentId: departments[].id
    },
    //////
    {  
      name:'Bouillon cubes',departmentId: departments[].id
    },{  
         
      name:'Cereal',departmentId: departments[].id
    },{  
         
     name:'Coffee / Filters',departmentId: departments[].id
    },
    {  
      name:'Instant potatoes',departmentId: departments[].id
    },
    {  
      name:'Lemon / Lime juice',departmentId: departments[].id
    },
    {  
      name:'Mac & cheese',departmentId: departments[].id
    },{  
      name:'Olive oil',departmentId: departments[].id
    },{  
         
      name:'Packaged meals',departmentId: departments[].id
    },
    {  
     name:'Pancake / Waffle mix',departmentId: departments[].id
    },
    {  
      name:'Pasta',departmentId: departments[].id
    },
    {  
       name:'Peanut butter',departmentId: departments[].id
    },{  
      name:'Pickles',departmentId: departments[].id
    },{  
       name:'Rice',departmentId: departments[].id
    },
    {  
       name:'Tea',departmentId: departments[].id
    },
    {  
       name:'Vegetable oil',departmentId: departments[].id
    },
    {  
       
  name:'Vinegar',departmentId: departments[].id
    },
    /////
    {  
         
      name:'Applesauce',departmentId: departments[].id
    },{  
      name:'Baked beans',departmentId: departments[].id
    },
    {  
       name:'Broth',departmentId: departments[].id
    },
    {  
       name:'Fruit',departmentId: departments[].id
    },
    {  
        name:'Olives',departmentId: departments[].id
    },{  
      name:'Tinned meats',departmentId: departments[].id
    },{  
        name:'Tuna / Chicken',departmentId: departments[].id
    },
    {  
      name:'Soup / Chili',departmentId: departments[].id
    },
    {  
      name:'Tomatoes',departmentId: departments[].id
    },
    {  
         
      name:'Veggies',departmentId: departments[].id
    },
    ////
    {  
      name:'Basil',departmentId: departments[].id
    },{  
      name:'Black pepper',departmentId: departments[].id
    },
    {  
      name:'Cilantro',departmentId: departments[].id
    },
    {  
      
  name:'Cinnamon',departmentId: departments[].id
    },
    {  
         name:'Garlic',departmentId: departments[].id
    },{  
       name:'Ginger',departmentId: departments[].id
    },{  
         name:'Mint',departmentId: departments[].id
    },
    {  
         name:'Oregano',departmentId: departments[].id
    },
    {  
         name:'Paprika',departmentId: departments[].id
    },
    {  
       name:'Parsley',departmentId: departments[].id
    },{  
      name:'Red pepper',departmentId: departments[].id
    },{  
      name:'Salt',departmentId: departments[].id
    },
    {         
    name:'Vanilla extract',departmentId: departments[].id
    },
    //////
    //////
    {         
    name:'Antiperspirant / Deodorant',departmentId: departments[].id
    },
    {         
    name:'Bath soap / Hand soap',departmentId: departments[].id
    },
    {         
    name:'Condoms / Other b.c.',departmentId: departments[].id
    },
    {         
    name:'Cosmetics',departmentId: departments[].id
    },
    {         
    name:'Cotton swabs / Balls',departmentId: departments[].id
    },
    {         
    name:'Facial cleanser',departmentId: departments[].id
    },
    {         
    name:'Facial tissue',departmentId: departments[].id
    },
    {         
    name:'Feminine products',departmentId: departments[].id
    },
    {         
    name:'Floss',departmentId: departments[].id
    },
    {         
    name:'Hair gel / Spray',departmentId: departments[].id
    },
    {         
    name:'Lip balm',departmentId: departments[].id
    },
    {         
    name:'Moisturizing lotion',departmentId: departments[].id
    },
    {         
    name:'Mouthwash',departmentId: departments[].id
    },
    {         
    name:'Razors / Shaving cream',departmentId: departments[].id
    },
    {         
    name:'Shampoo / Conditioner',departmentId: departments[].id
    },
    {         
    name:'Sunblock',departmentId: departments[].id
    },
    {         
    name:'Toilet paper',departmentId: departments[].id
    },
    {         
    nname:'Toothpaste',departmentId: departments[].id
    },
    {         
    name:'Vitamins / Supplements',departmentId: departments[].id
    },
    ///
    {         
    name:'Allergy',departmentId: departments[].id
    },
    {         
    name:'Antibiotic',departmentId: departments[].id
    },
    {         
    name:'Antidiarrheal',departmentId: departments[].id
    },
    {         
    name:'Aspirin',departmentId: departments[].id
    },
    {         
    name:'Antacid',departmentId: departments[].id
    },
    {         
    name:'Band-aids / Medical',departmentId: departments[].id
    },
    {         
    name:'Cold / Flu / Sinus',departmentId: departments[].id
    },
    {         
    name:'Pain reliever',departmentId: departments[].id
    },
    {         
    name:'Prescription pick-up',departmentId: departments[].id
    },
    ////
    {         
    name:'Aluminum foil',departmentId: departments[].id
    },
    {         
    name:'Napkins',departmentId: departments[].id
    },
    {         
    name:'Non-stick spray',departmentId: departments[].id
    },
    {         
   name:'Paper towels',departmentId: departments[].id
    },
    {         
    name:'Plastic wrap',departmentId: departments[].id
    },
    {         
    name:'Sandwich / Freezer bags',departmentId: departments[].id
    },
    {         
    name:'Wax paper',departmentId: departments[].id
    },
    ///

    ///
    {         
    name:'Air freshener',departmentId: departments[].id
    },
    {         
    name:'Bathroom cleaner',departmentId: departments[].id
    },
    {         
    name:'Bleach / Detergent',departmentId: departments[].id
    },
    {         
    name:'Dish / Dishwasher soap',departmentId: departments[].id
    },
    {         
    name:'Garbage bags',departmentId: departments[].id
    },
    {         
    name:'Glass cleaner',departmentId: departments[].id
    },
    {         
    name:'Mop head / Vacuum bags',departmentId: departments[].id
    },
    {         
    name:'Sponges / Scrubbers',departmentId: departments[].id
    },
    ////
    {         
    name:'CDRs / DVDRs',departmentId: departments[].id
    },
    {         
    name:'Notepad / Envelopes',departmentId: departments[].id
    },
    {         
    name:'Glue / Tape',departmentId: departments[].id
    },
    {         
    name:'Printer paper',departmentId: departments[].id
    },
    {         
    name:'Pens / Pencils',departmentId: departments[].id
    },
    {         
    name:'Postage stamps',departmentId: departments[].id
    },
    ///
    {         
    name:'Arsenic',departmentId: departments[].id
    },
    {         
    name:'Asbestos',departmentId: departments[].id
    },
    {         
    name:'Cigarettes',departmentId: departments[].id
    },
    {         
    name:'Radionuclides',departmentId: departments[].id
    },
    {         
    name:'Vinyl chloride',departmentId: departments[].id
    },
    ///
    {         
    name:'Batteries',departmentId: departments[].id
  
    },
    {         
    name:'Charcoal / Propane',departmentId: departments[].id
    },
    {         
    name:'Flowers / Greeting card',departmentId: departments[].id
    },
    {         
    name:'Insect repellent',departmentId: departments[].id
    },
    {         
    name:'Light bulbs',departmentId: departments[].id
    },
    {         
    name:'Newspaper / Magazine',departmentId: departments[].id
    },
    {         
    name:'Random impulse buy',departmentId: departments[].id
    },
    ///

    ///
    

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

function createIngredients(departments, cb){
  database.automigrate('Ingredient', function(err){
    if (err) return cb(err);

    Ingredient.create(getIngredients( departments ), cb);
  });
};

module.exports.attachIngredientsToRecipes = attachIngredientsToRecipes;
module.exports.createIngredients = createIngredients;