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
        departmentId: departments[0].id
  	},
  	{ 
        name: "Broccoli",
        departmentId: departments[0].id
    },
    { 
        name: "Carrots",
        departmentId: departments[0].id
  	},
  	{  
        name: "Cauliflower",
        departmentId: departments[0].id
  	},
    {  
        name: "Celery",
        departmentId: departments[0].id
    },
    {  
        name: "Corn",
        departmentId: departments[0].id
    },
    {  
        name: "Cucumbers",
        departmentId: departments[0].id
    },
    {  
        name: "Lettuce / Greens",
        departmentId: departments[0].id
    },
    {  
        name: "Mushrooms",
        departmentId: departments[0].id
    },
    {  
        name: "Onions",
        departmentId: departments[0].id
    },
    {  
        name: "Peppers",
        departmentId: departments[0].id
    },
    {  
        name: "Potatoes",
        departmentId: departments[0].id
    },
    {  
        name: "Spinach",
        departmentId: departments[0].id
    },
    {  
        name: "Squash",
        departmentId: departments[0].id
    },
    {  
        name: "Zucchini",
        departmentId: departments[0].id
    },
    {  
        name: "Tomatoes*",
        departmentId: departments[0].id
    },

    /////


    {  
        name: "BBQ sauce",
        departmentId: departments[1].id
    },
    {  
        name: "Gravy",
        departmentId: departments[1].id
    },
    {  
        name: "Honey",
        departmentId: departments[1].id
    },
    {  
        name: "Hot sauce",
        departmentId: departments[1].id
    },
    {  
        name: "Jam / Jelly / Preserves",
        departmentId: departments[1].id
    },
    {  
        name: "Ketchup / Mustard",
        departmentId: departments[1].id
    },
    {  
        name: "Pasta sauce",
        departmentId: departments[1].id
    },
    {  
        name: "Relish",
        departmentId: departments[1].id
    },
    {  
        name: "Salad dressin",
        departmentId: departments[1].id
    },
    {  
        name: "Salsa",
        departmentId: departments[1].id
    },
    {  
        name: "Soy sauce",
        departmentId: departments[1].id
    },
    {  
        name: "Steak sauce",
        departmentId: departments[1].id
    },
    {  
        name: "Syrup",
        departmentId: departments[1].id
    },
    {  
        name: "Worcestershire sauce",
        departmentId: departments[1].id
    },

    //////
    {  
        name: "Butter / Margarine",
        departmentId: departments[2].id
    },
    {  
        name: "Cottage cheese",
        departmentId: departments[2].id
    },
    {  
        name: "Half & half",
        departmentId: departments[2].id
    },
    {  
        name: "Milk",
        departmentId: departments[2].id
    },
    {  
        name: "Sour cream",
        departmentId: departments[2].id
    },

    {  
        name: "Whipped cream",
        departmentId: departments[2].id
    },
    {  
        name: "Yogurt",
        departmentId: departments[2].id
    },

    ////
    {  
        name: "Bleu cheese",
        departmentId: departments[3].id
    },
    {  
        name: "Cheddar",
        departmentId: departments[3].id
    },
    {  
        name: "Cottage cheese",
        departmentId: departments[3].id
    },
    {  
        name: "Cream cheese",
        departmentId: departments[3].id
    },
    {  
        name: "Feta",
        departmentId: departments[3].id
    },
    {  
        name: "Goat cheese",
        departmentId: departments[3].id
    },
    {  
        name: "Mozzarella",
        departmentId: departments[3].id
    },
    {  
        name: "Parmesan",
        departmentId: departments[3].id
    },
    {  
        name: "Provolone",
        departmentId: departments[3].id
    },
    {  
        name: "Ricotta",
        departmentId: departments[3].id
    },
    {  
        name: "Sandwich slices",
        departmentId: departments[3].id
    },
    {  
        name: "Swiss",
        departmentId: departments[3].id
    },

    ////
    {  
        name: "Bacon / Sausage",
        departmentId: departments[4].id
    },
    {  
        name: "Beef",
        departmentId: departments[4].id
    },
    {  
        name: "Chicken",
        departmentId: departments[4].id
    },
    {  
        name: "Ground beef / Turkey",
        departmentId: departments[4].id
    },
    {  
        name: "Ham / Pork",
        departmentId: departments[4].id
    },
    {  
        name: "Hot dogs",
        departmentId: departments[4].id
    },
    {  
        name: "Lunchmeat",
        departmentId: departments[4].id
    },

    {  
        name: "Turkey",
        departmentId: departments[4].id
    },

    /////
    {  
        name: "Catfish",
        departmentId: departments[5].id
    },
    {  
        name: "Crab",
        departmentId: departments[5].id
    },
    {  
        name: "Lobster",
        departmentId: departments[5].id
    },
    {  
        name: "Mussels",
        departmentId: departments[5].id
    },
    {  
        name: "Oysters",
        departmentId: departments[5].id
    },
    {  
        name: "Salmon",
        departmentId: departments[5].id
    },
    {  
        name: "Shrimp",
        departmentId: departments[5].id
    },
    {  
        name: "Tilapia",
        departmentId: departments[5].id
    },
    {  
        name: "Tuna",
        departmentId: departments[5].id
    },
    ///
    {  
        name: "Beer",
        departmentId: departments[6].id
    },
    {  
        name: "Club soda / Tonic",departmentId: departments[6].id
    },
    {  
        name: "Champagne",departmentId: departments[6].id
    },
    {  
        name: "Gin",departmentId: departments[6].id
    },
    {  
        name: "Juice",departmentId: departments[6].id
    },
    {  
        name: "Mixers",departmentId: departments[6].id
    },
    {  
        name: "Red wine / White wine",departmentId: departments[6].id
    },
    {  
        name: "Rum",departmentId: departments[6].id
    },
    {  
        name: "Saké",departmentId: departments[6].id
    },
    {  
        name: "Soda pop",departmentId: departments[6].id
    },
    {  
        name: "Sports drink",departmentId: departments[6].id
    },
    {  
        name: "Whiskey",departmentId: departments[6].id
    },
    {  
        name: "Vodka",departmentId: departments[6].id
    },
    ///
    {  
        name: "Bagels / Croissants",departmentId: departments[7].id
    },
    {  
        name: "Buns / Rolls",departmentId: departments[7].id
    },
    {  
        name: "Cake / Cookies",departmentId: departments[7].id
    },
    {  
        name: "Donuts / Pastries",departmentId: departments[7].id
    },
    {  
        name: "Fresh bread",departmentId: departments[7].id
    },
    {  
        name: "Pie! Pie! Pie!",departmentId: departments[7].id
    },
    {  
        name: "Pita bread",departmentId: departments[7].id
    },
    {  
        name: "Sliced bread",departmentId: departments[7].id
    },
    ////
    {  
        name:'Baking powder / Soda',departmentId: departments[8].id
    },
    {  
        name:'Bread crumbs',departmentId: departments[8].id
    },
    {  
        name:'Cake / Brownie mix',departmentId: departments[8].id
    },
    {  
        name:'Cake icing / Decorations',departmentId: departments[8].id
  
    },
    {  
        name:'Chocolate chips / Cocoa',departmentId: departments[8].id
  
    },
    {  
        name:'Flour',departmentId: departments[8].id
    },
    {  
        name:'Shortening',departmentId: departments[8].id
    },
    {  
        name:'Sugar',departmentId: departments[8].id
    },
    {  
       name:'Sugar substitute',departmentId: departments[8].id
    },
    {  
        name:'Yeast',departmentId: departments[8].id
    },
    ///
    {  
        name:'Candy / Gum',departmentId: departments[9].id
    },
    {  
        name:'Cookies',departmentId: departments[9].id
    },
    {  
           name:'Crackers',departmentId: departments[9].id
    },
    {  
         name:'Dried fruit',departmentId: departments[9].id
    },

    {  
         name:'Granola bars / Mix',departmentId: departments[9].id
    },
    {  
        name:'Nuts / Seeds',departmentId: departments[9].id
    },
    {  
       name: 'Oatmeal',departmentId: departments[9].id
    },
    {  
        name:'Popcorn',departmentId: departments[9].id
    },
    {  
       name:'Potato / Corn chips',departmentId: departments[9].id
    },
    {  
         
      name:'Pretzels',departmentId: departments[9].id
    },
    ////
    {  
         
      name:'Burger night',departmentId: departments[10].id
    },
    {  
         
      name:'Chili night',departmentId: departments[10].id
    },
    {  
         
      name:'Pizza night',departmentId: departments[10].id
    },
    {  
         
     name:'Spaghetti night',departmentId: departments[10].id
    },
    {  
         
      name:'Taco night',departmentId: departments[10].id
    },
    {  
     name:'Take-out deli food',departmentId: departments[10].id
    },
    ////
    {  
         
     name:'Baby food',departmentId: departments[11].id
    },
    {  
         
     name:'Diapers',departmentId: departments[11].id
    },
    {  
         
        name:'Formula',departmentId: departments[11].id
    },
    {  
         
      name:'Lotion',departmentId: departments[11].id
    },
    {  
         
      name:'Baby wash',departmentId: departments[11].id
    },
    {  
         
     name:'Wipes',departmentId: departments[11].id
    },
    ///
    {  
       name:'Cat food / Treats',departmentId: departments[12].id
    },
    {  
         
      name:'Cat litter',departmentId: departments[12].id
    },
    {  
         
      name:'Dog food / Treats',departmentId: departments[12].id
    },
    {  
     name:'Flea treatment',departmentId: departments[12].id
    },
    {  
         
      name:'Pet shampoo',departmentId: departments[12].id
    },
//////
    {  
         
     name:'Apples',departmentId: departments[13].id
    },
    {  
         
     name:'Avocados',departmentId: departments[13].id
    },

    {  
     name:'Bananas',departmentId: departments[13].id
    },
    {  
         
    name:'Berries',departmentId: departments[13].id
    },

    {  
         
      name:'Cherries',departmentId: departments[13].id
    },
    {  
         
     name:'Grapefruit',departmentId: departments[13].id
    },
    {  
     name:'Grapes',departmentId: departments[13].id
    },
    {  
      name:'Kiwis',departmentId: departments[13].id
    },
    {  
         name:'Lemons / Limes',departmentId: departments[13].id
    },

    {  
        name:'Melon',departmentId: departments[13].id
    },
    {  
    name:'Nectarines',departmentId: departments[13].id
    },
    {  
       name:'Oranges',departmentId: departments[13].id
    },
    {  
         
     name:'Peaches',departmentId: departments[13].id
    },

    {      
      name:'Pears',departmentId: departments[13].id
    },
    {  
         
  name:'Plums',departmentId: departments[13].id
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