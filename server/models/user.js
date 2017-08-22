'use strict';

module.exports = function(User) {


    User.observe("after save", function embeddedRelations(ctx, next) {

    	var UserGrocery  = User.app.models.userGrocery;
 		var UserFavorite = User.app.models.userFav;   	

    	if( ctx.isNewInstance ){
    		
    		UserGrocery.create({
    			userId: ctx.instance.id,
    			groceryIds: []	
    		});

    		UserFavorite.create({
    			userId: ctx.instance.id,
    			favs: []	
    		});
    	}


    	next();
    });


    User.listFavorites = function(userId, cb){

        var Ingredient = User.app.models.Ingredient;

        User.findById(userId, {
            include: {
                relation: 'favorites',
                scope: {
                    fields: [ 'name', 'created_at' ],
                }
            }
        }, function(err, model){

            var data      = model.toJSON();
            var favorites = [];

            // console.log(data.favorites);


            data.favorites.forEach(function(item, i){
              
                // console.log(item.name);
                // console.log(item.id);
                favorites.push({ id: item.id, name: item.name });

                
            });


            cb(null, favorites);

        });

    }
    //:todo add remote method for this functionality

    User.attachFavoriteToUser = function(ingredientId, userId, cb){
       
        // var Ingredient = User.app.models.Ingredient;

        User.findById(userId, {

        }, function(err, model){

            // console.log(model);
            var favoritesArray = [];

            if (typeof model.favs !== 'undefined'){
                favoritesArray = model.favs;
            }

            // console.log(favoritesArray);
            favoritesArray.unshift(ingredientId);
            // console.log(favoritesArray);
            
            model.updateAttribute('favs', favoritesArray);
            // console.log(model);
        });

    };
    //:todo add remote method for this functionality

};