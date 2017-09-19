'use strict';

module.exports = function(Ingredient) {
    
    //:todo add to done & delete default false
	Ingredient.validatesPresenceOf(
		'name', 
        // 'type', 
        // 'done', 'delete'

        // 'term',
        // 'description',
        // 'searchValue',
	);

    Ingredient.observe("before save", function updateTimestamp(ctx, next) {

    	if( ctx.isNewInstance ){
    		ctx.instance.created_at = new Date();
    		ctx.instance.updated_at = new Date();

            ctx.instance.done   = false;
            ctx.instance.delete = false;            
    	} 


    	next();
    });

    Ingredient.observe('update', function(ctx, next){
        ctx.instance.updated_at = new Date();
        next();
    });


    Ingredient.methodC = function(ingredientId, cb){

        var Deparments = Ingredient.app.models.Deparments;

        Deparments.find({
            include: {
              relation: 'ingredients',
              scope: {
                fields: [ 'name', 'id' ],
                where: { id:ingredientId }
              }
            }
        }).then(function(result){

        });



        // Grocery.find({
        //     include: {
        //       relation: 'ingredients',
        //       scope: {
        //         fields: [ 'name', 'id' ],
        //         where: { id:ingredientId }
        //       }
        //     }
        // }).then(function(result){

        // });


        // Ingredient.findById(ingredientId, {
        //     // { 
        //         "aggregate": { "group": { "id": "$status", "count": { "$sum": 1 } } } 
        //     // }
        // }, function(result){



        //     // cb(null, data);

        // });

    };

    // Ingredient.remoteMethod('listIngredients', {
    //     accepts: {
    //       arg: 'recipeId',
    //       type: 'string'
    //     },
    //     returns: {
    //       arg: 'menus',
    //       type: 'array'
    //     },
    //     http: {
    //       path: '/recipe/list/ingredients',
    //       verb: 'get'
    //     }
    // });

    // Ingredient.findByIds = function(ingredientIds, cb){
    //     Ingredient.find({
    //             where:{
    //                 id: ingredientIds
    //             }       
    //         }).then(cb);
    // };





  // method list attached ingredients with unit convertion and additions
	// RecipeModel.listIngredients = function(recipeId, cb){
 //        var IngredientModel = RecipeModel.app.models.IngredientModel;

 //        RecipeModel.findById(recipeId)
 //        .then(function(recipe){
 //            console.log( recipe.ingredients );
 //            // @TODO change to custom method on recipe model
 //            return IngredientModel.find({
 //                where:{
 //                    id: recipe.ingredients
 //                }       
 //            })
 //            .then(function(ingredients){
 //            //  recipe.ingredients = ingredients;
 //            // console.log(recipe);
 //            // return recipe;
 //            // or cb(ingredients);
 //            });




 //        })
 //        .catch(function(err){
 //            if(err){ cb(err); }
 //        });


    Ingredient.proceed = function(options){
        var type = options.type;

        Ingredient.findById(options.id, function(err, model){

            if( type == 'delete' ){

                // here we need to check, if this ingredient are included at MotherIngredients/

            }

        });
    };

};