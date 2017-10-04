'use strict';

module.exports = function(Department) {
	Department.validatesPresenceOf(
    'name', 
    // 'items'
  );

	Department.observe('update', function(ctx, next){
		ctx.instance.updated_at = new Date();
		next();
	});

  Department.observe("before save", function updateTimestamp(ctx, next) {

    if( ctx.isNewInstance ){
      ctx.instance.created_at = new Date();
      ctx.instance.updated_at = new Date();

      // ctx.instance.visible    = true;
    } 



    next();
  });


  Department.observe("before delete", function (ctx, next) {

    // console.log('before hook fired');
    
    var Ingredient = ctx.Model.app.models.Ingredient;

    Ingredient.find({
      where: {
        departmentId: ctx.where.id
      }
    }).then(function(ingredients){
      console.log(ingredients);

      ingredients.forEach(function(ingredient){
        Ingredient.destroyById(ingredient.id, function(){
          console.log("Deleted ingredient", ingredient.id);
        })
      })

    })
    .catch(function(err){
      throw err;
    });



    next();
  });



  Department.getOne = function( departmentId, cb ){

      Department.findById(departmentId, {
        include: {
          relation: 'ingredients',
          scope: {
            fields: [ 'name', 'id' ]
          }
        },
        // where: 


    })
    // .then(function(department){
    //   console.log(department);
    // })
    .then(cb);

  };


  Department.methodB = function( departmentId, cb ){

      Department.findById(departmentId, {
        include: {
          relation: 'ingredients',
          scope: {
            fields: [ 'name', 'id' ]
          }
        },
        
        // where: 


    })
    // .then(function(department){
    //   console.log(department);
    // })
    .then(cb);

  };



  Department.IngredientsByDepartment = function(departmentId, cb){

    var Ingredient = Department.app.models.Ingredient;

    // we assume that we're have departmentId array. maybe we need to have 1-to-1 relation
    // departmentId: { inq:departmentId } //we assume that we're have departmentId array. maybe we need to have 1-to-1 relation

    Ingredient.find({
        where:{
          departmentId: departmentId 
    
        },
        fields: [
          // 'img', 'url',

          ]       
      },cb);


  };



  Department.remoteMethod('IngredientsByDepartment', {
    accepts: {
      arg: 'departmentId',
      type: 'string',
      required: true
    },
    returns: {
      arg: 'ingredients',
      type: 'array'
    },
    http: {
      path: '/ingredients/list',
      verb: 'get'
    }
  });



};
