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

        User.findById(userId, {}, function(model){
            console.log(model.favs);
        });

    }
    //:todo add remote method for this functionality

};