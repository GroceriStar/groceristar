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
                     relation: 'ingredients'
                 }
             }
         }
        }, function(err, user){

            // console.log( user );

            var g = user.toJSON();

            // _.map( g.groceries, item => console.log(item.ingredients) );

            


            _.map( g.groceries, function(grocery){

                // console.log(); 

                // var arr = _.pluck(grocery.ingredients, 'departmentId');
                // var uniqueList = _.uniq(grocery.ingredients, 'departmentId');
                // console.log(uniqueList); 

                var mySubArray = [];

                _.each(_.uniq(_.pluck(grocery.ingredients, 'departmentId')), function(name) {
                    mySubArray.push(_.findWhere(grocery.ingredients, {departmentId: departmentId}));
                });

                console.log(mySubArray);


                var uniques = _.map(_.groupBy(grocery.ingredients,function(doc){
                      return doc.departmentId;
                    }),function(grouped){
                      return grouped[0];
                    });

console.log(uniques);

                });




        });

    }; 

};