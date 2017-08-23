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

        // var Ingredient = User.app.models.Ingredient;
        //:todo start to use this method getCurrentUserWithFavorites
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


    User.getCurrentUserWithFavorites = function(userId, cb){

        User.findById(userId, {
            include: {
                relation: 'favorites',
                scope: {
                    fields: [ 'id', 'name', 'created_at' ],
                }
            }
        }, cb);


    };

    User.detachGroceryAKADelete = function(groceryId, userId, cb){

        User.findById(userId, {}, function(err, model){

            if( model.groceryIds.includes(groceryId) ){
                
                // destroyById

                
                var data = model.toJSON();
                console.log(data);
                console.log(model.groceryIds);

                if( !data.purchasedIds ){ return true; } //:todo test this

                let forDeletion = [ ingredientId ];

                let arr = data.purchasedIds;

                arr = arr.filter(item => !forDeletion.includes(item))
                // !!! Read below about array.includes(...) support !!!

                console.log(arr);

                model.updateAttribute('purchasedIds', arr);
                console.log(model);

            }

        });

    };
};