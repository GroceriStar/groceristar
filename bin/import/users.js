'use strict';

var User  = server.models.user;
// var relation    = 'ingredients';

function getUsers() {
	var accounts = [	
		{
		  name: 'john',	
		  email: 'john.doe@ibm.com',
		  password: 'john1',
		  // menus: [],
		},
		{
		  name: 'jane',
		  email: 'jane.doe@ibm.com',
		  password: 'jane1',
		  // menus: [],
		},
		{
		  name: 'admin',
		  email: 'admin@ibm.com',
		  password: 'admin',
		  // menus: [],
		}
  	];

  	return accounts;

};


function createUsers(cb){
	// console.log(users);
	database.automigrate('user', function(err){
		if (err) return cb(err);

		User.create(getUsers(), cb);
	});
};

function assignAdmin(admin){
	
	database.automigrate('Role', function(err){
		if (err) return cb(err);

		Role.create({ name:'admin' })
		.then(function(role){

			role.principals.create({
                  principalType: RoleMapping.USER,
                  principalId: admin.id
              }, function(err, principal){
                console.log('Principal', principal);
              });

		})
		.catch(function(err){
            throw err;
          });
	});	
};


function attachGroceryToAdmin(admin, grocery){

	var options = {
      type  : 'attach',
      field : 'groceryIds',
      userId: admin.id,
      secondArray: [ grocery.id ]
    };
    User.proceed(options);

	// grocery.updateAttribute('userId', admin.id);

	// videos.forEach(function(video){
	// 	video.updateAttribute('userId', admin.id);
		
	// });

};


// function attachRecipeToUsers(users, recipes, cb){

// 	recipes.forEach(function(recipe){
// 		recipe.updateAttribute('userId', users[2].id);
		
// 	});

// };


function getAdminGLlists = function( User ){
	// this is a custom method for user model, 
	// which I decided to move from main model definition to this place

	User.withAdmin = function(cb){
        User.findOne({
        	where: {
				username: 'admin'
			},

	        include: {
	             relation: 'groceries',
	             scope: {
	                 // where: {
	                 //     id: groceryId 
	                 // },
	                 // include: {
	                 //     relation: 'departmentsList',
	                 // }
	             }
	        }
        }, cb);
    };

	User.getAdminData = function(){


		User.withAdmin(function(err, admin){
			console.log(admin);
		});




		User.findOne({
			where : {
					username: 'admin'
			},
			include: {
				relation: ''
			} 
		})
		.then(function(admin){
			// console.log(admin.id);

			// admin.videos({},function(err, videos){
			// 	console.log(videos)
			// })

			VideoModel.find({
				where: {
					// userId: admin.id 
					userId:  admin.id 
				},
				fields: [
					'title', 'url', 'desc',
					'start', 'end', 'step'
				]				
				
			}, function(err, videos){
				console.log(videos)
			});
		});

	};

};

module.exports.createUsers     = createUsers;
module.exports.assignAdmin     = assignAdmin;
module.exports.getAdminGLlists = getAdminGLlists;