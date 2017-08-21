'use strict';

module.exports = function(User) {



	User.listFavorites = function(userId, cb){

		User.findById(userId, {}, function(model){
			console.log(model.favs);
		});

	}
	//:todo add remote method for this functionality

};