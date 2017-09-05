'use strict';

var _ = require('underscore');

module.exports = function(User) {


    User.observe("after save", function embeddedRelations(ctx, next) {
    	var UserGrocery  = User.app.models.userGrocery;
 		var UserFavorite = User.app.models.userFav;   	

    	if( ctx.isNewInstance ) {   		
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

    // :todo add remote method for this functionality
    // :todo update forEach to underscore, as we use it
    User.listFavorites = function(userId, cb){

        // var Ingredient = User.app.models.Ingredient;
        // :todo start to use this method getCurrentUserWithFavorites
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


    // _map and toString is equal to model.toJSON
    User.proceed = function(options){

        var type = options.type;

        User.findById(options.userId, {}, function(err, model){

            if( options.type == 'clear'){

                model.updateAttribute(options.field, []);   

            }


            if( options.type == 'add' || options.type == 'attach' ){

                let arr = _.map(model[options.field], item => item.toString());

                var mergedValues = _.union( options.secondArray, arr  ); // second array is first because of grocery lists

                model.updateAttribute(options.field, mergedValues);

            }       


            if( options.type == 'remove' || options.type == 'detach' ){

                if( !model[options.field] ){ return true; }

                let arr = _.map(model[options.field], item => item.toString());

                arr = arr.filter(item => !options.secondArray.includes(item));
                // !!! Read below about array.includes(...) support !!!

                model.updateAttribute(options.field, arr);


            }

            

        });

    }



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



    // User.detachGroceryAKADelete = function(groceryId, userId, cb){

    //     User.findById(userId, {}, function(err, model){

    //         if( model.groceryIds.includes(groceryId) ){

    //             // 

                
    //             var data = model.toJSON();
    //             // var data = model;
    //             console.log(data);
    //             // console.log(data.groceryIds);

    //             if( !data.groceryIds ){ return true; } //:todo test this

    //             let forDeletion = [ groceryId ];

    //             let arr = data.groceryIds;

    //             arr = arr.filter(item => !forDeletion.includes(item))
    //             // !!! Read below about array.includes(...) support !!!

    //             console.log(arr);

    //             model.updateAttribute('groceryIds', arr);
    //             console.log(model);

    //             var Grocery = User.app.models.Grocery;
    //             Grocery.destroyById(groceryId, function(err){});

    //         }

    //     });

    // };


    User.methodofMethods = function(userId, cb){


        // User.findById(userId, {
        //  include: {
        //      relation: 'groceries',
        //      scope: {
        //          where: {
        //              id: groceryId 
        //          },
        //          include: {
        //              relation: 'departmentsList',
        //          }
        //      }
        //  }
        // }, function(err, user){

        //  console.log( user );

        // });

    };
   

    User.methodofAllMethods = function(userId, cb){


        User.findById(userId, {
         include: {
             relation: 'groceries',
             scope: {
                 // where: {
                 //     id: groceryId 
                 // },
                 include: {
                     relation: 'ingredients',
                 }
             }
         }
        }, function(err, user){

            console.log( user );

        });

    }; 

};