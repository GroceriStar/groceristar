'use strict';
var path        = require('path');
let server      = require(path.resolve(__dirname, '../../server/server'));
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
        name:'Candy / Gum',
    },
    {  
        name:'Cookies',
    },
    {  
           name:'Crackers',
    },
    {  
         name:'Dried fruit',
    },

    {  
         name:'Granola bars / Mix',
    },
    {  
        name:'Nuts / Seeds',
    },
    {  
       name: 'Oatmeal',
    },
    {  
        name:'Popcorn',
    },
    {  
       name:'Potato / Corn chips',
    },
    {  
         
      name:'Pretzels'
    },
    ////
    {  
         
      name:'Burger night',
    },
    {  
         
      name:'Chili night',
    },
    {  
         
      name:'Pizza night',
    },
    {  
         
     name:'Spaghetti night',
    },
    {  
         
      name:'Taco night',
    },
    {  
     name:'Take-out deli food'
    },
    {  
         
     name:'Baby food',
    },
    {  
         
     name:'Diapers',
    },
    {  
         
        name:'Formula',
    },
    {  
         
      name:'Lotion',
    },
    {  
         
      name:'Baby wash',
    },
    {  
         
     name:'Wipes'
    },
    ///
    {  
       name:'Cat food / Treats',
    },
    {  
         
      name:'Cat litter',
    },
    {  
         
      name:'Dog food / Treats',
    },
    {  
     name:'Flea treatment',
    },
    {  
         
      name:'Pet shampoo'
    },
//////
    {  
         
     name:'Apples',
    },
    {  
         
     name:'Avocados',
    },

    {  
     name:'Bananas',
    },
    {  
         
    name:'Berries',
    },

    {  
         
      name:'Cherries',
    },
    {  
         
     name:'Grapefruit',
    },
    {  
     name:'Grapes',
    },
    {  
      name:'Kiwis',
    },
    {  
         name:'Lemons / Limes',
    },

    {  
        name:'Melon',
    },
    {  
    name:'Nectarines',
    },
    {  
       name:'Oranges',
    },
    {  
         
     name:'Peaches',
    },

    {      
      name:'Pears',
    },
    {  
         
  name:'Plums'
    },
    ////////
    {  
         
      name:'Bagels',
    },
    {  
         
     name:'Chip dip',
    },
    {  
         
      name:'Eggs / Fake eggs',
    },
    {  
         
     name:'English muffins',
    },
    {  
         
   name:'Fruit juice',
    },
    {  
        
  name:'Hummus',
    },
    {  
        name:'Ready-bake breads',
    },
    {  
         name:'Tofu',
    },
    {  
        
  name:'Tortillas'
    },
    ///
    {  
     name:'Breakfasts',
    },
    {  
      name:'Burritos',
    },
    {  
      
  name:'Fish sticks',
    },
    {  
      name:'Fries / Tater tots',
    },
    {  
      name:'Ice cream / Sorbet',
    },
    {  
        name:'Juice concentrate',
    },
    {  
     name:'Pizza',
    },
    {  
      name:'Pizza Rolls',
    },{  
      name:'Popsicles',
    },{  
      
  name:'TV dinners',
    },
    {  
       
  name:'Vegetables'
    },
    //////
    {  
      name:'Bouillon cubes',
    },{  
         
      name:'Cereal',
    },{  
         
     name:'Coffee / Filters',
    },
    {  
      name:'Instant potatoes',
    },
    {  
      name:'Lemon / Lime juice',
    },
    {  
      name:'Mac & cheese',
    },{  
      name:'Olive oil',
    },{  
         
      name:'Packaged meals',
    },
    {  
     name:'Pancake / Waffle mix',
    },
    {  
      name:'Pasta',
    },
    {  
       name:'Peanut butter',
    },{  
      name:'Pickles',
    },{  
       name:'Rice',
    },
    {  
       name:'Tea',
    },
    {  
       name:'Vegetable oil',
    },
    {  
       
  name:'Vinegar'
    },
    /////
    {  
         
      name:'Applesauce',
    },{  
      name:'Baked beans',
    },
    {  
       name:'Broth',
    },
    {  
       name:'Fruit',
    },
    {  
        name:'Olives',
    },{  
      name:'Tinned meats',
    },{  
        name:'Tuna / Chicken',
    },
    {  
      name:'Soup / Chili',
    },
    {  
      name:'Tomatoes',
    },
    {  
         
      name:'Veggies'
    },
    ////
    {  
      name:'Basil',
    },{  
      name:'Black pepper',
    },
    {  
      name:'Cilantro',
    },
    {  
      
  name:'Cinnamon',
    },
    {  
         name:'Garlic',
    },{  
       name:'Ginger',
    },{  
         name:'Mint',
    },
    {  
         name:'Oregano',
    },
    {  
         name:'Paprika',
    },
    {  
       name:'Parsley',
    },{  
      name:'Red pepper',
    },{  
      name:'Salt',
    },
    {         
    name:'Vanilla extract'
    },
    //////
    //////
    {         
    name:'Antiperspirant / Deodorant',
    },
    {         
    name:'Bath soap / Hand soap',
    },
    {         
    name:'Condoms / Other b.c.',
    },
    {         
    name:'Cosmetics',
    },
    {         
    name:'Cotton swabs / Balls',
    },
    {         
    name:'Facial cleanser',
    },
    {         
    name:'Facial tissue',
    },
    {         
    name:'Feminine products',
    },
    {         
    name:'Floss',
    },
    {         
    name:'Hair gel / Spray',
    },
    {         
    name:'Lip balm',
    },
    {         
    name:'Moisturizing lotion',
    },
    {         
    name:'Mouthwash',
    },
    {         
    name:'Razors / Shaving cream',
    },
    {         
    name:'Shampoo / Conditioner',
    },
    {         
    name:'Sunblock',
    },
    {         
    name:'Toilet paper',
    },
    {         
    nname:'Toothpaste',
    },
    {         
    name:'Vitamins / Supplements'
    },
    ///
    {         
    name:'Allergy',
    },
    {         
    name:'Antibiotic',
    },
    {         
    name:'Antidiarrheal',
    },
    {         
    name:'Aspirin',
    },
    {         
    name:'Antacid',
    },
    {         
    name:'Band-aids / Medical',
    },
    {         
    name:'Cold / Flu / Sinus',
    },
    {         
    name:'Pain reliever',
    },
    {         
    name:'Prescription pick-up'
    },
    ////
    {         
    name:'Aluminum foil',
    },
    {         
    name:'Napkins',
    },
    {         
    name:'Non-stick spray',
    },
    {         
   name:'Paper towels',
    },
    {         
    name:'Plastic wrap',
    },
    {         
    name:'Sandwich / Freezer bags',
    },
    {         
    name:'Wax paper'
    },
    ///

    ///
    {         
    name:'Air freshener',
    },
    {         
    name:'Bathroom cleaner',
    },
    {         
    name:'Bleach / Detergent',
    },
    {         
    name:'Dish / Dishwasher soap',
    },
    {         
    name:'Garbage bags',
    },
    {         
    name:'Glass cleaner',
    },
    {         
    name:'Mop head / Vacuum bags',
    },
    {         
    name:'Sponges / Scrubbers'
    },
    ////
    {         
    name:'CDRs / DVDRs',
    },
    {         
    name:'Notepad / Envelopes',
    },
    {         
    name:'Glue / Tape',
    },
    {         
    name:'Printer paper',
    },
    {         
    name:'Pens / Pencils',
    },
    {         
    name:'Postage stamps'
    },
    ///
    {         
    name:'Arsenic',
    },
    {         
    name:'Asbestos',
    },
    {         
    name:'Cigarettes',
    },
    {         
    name:'Radionuclides',
    },
    {         
    name:'Vinyl chloride',
    },
    ///
    {         
    name:'Batteries',
  
    },
    {         
    name:'Charcoal / Propane',
    },
    {         
    name:'Flowers / Greeting card',
    },
    {         
    name:'Insect repellent',
    },
    {         
    name:'Light bulbs',
    },
    {         
    name:'Newspaper / Magazine',
    },
    {         
    name:'Random impulse buy',
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

function createIngredients(cb){
  database.automigrate('Ingredient', function(err){
    if (err) return cb(err);

    Ingredient.create(getIngredients(), cb);
  });
};

module.exports.attachIngredientsToRecipes = attachIngredientsToRecipes;
module.exports.createIngredients = createIngredients;