'use strict';


const path      = require('path');
// var validator = require('express-validator');

let server    = require(path.resolve(__dirname, '../server'));
// var Video     = server.models.VideoModel;
// var Example   = server.models.ExampleModel;


exports.getHomepage = async (req, res, next) => {

      var data = {};
      let admin
      try {

        // var Grocery   = app.models.Grocery;
        var User = app.models.user;
        // var groceryId = req.params.groceryId;  

        // this is a duplicated code. :todo
        admin    = await User.findOne(User.queryUltimateAdmin());

        var json     = admin.toJSON();
        var ultimate = json.groceries[0];
        data = {
          id: ultimate.id,
          name: ultimate.name
        };

        // console.log(data);

        res.render('pages/landing', {
          user: req.user,
          url : req.url,
          data: data,
          title: "Online Grocery Lists" //:todo
          
        });

        
      } catch (e) {
        //this will eventually be handled by your error handling middleware
        next(e) 
      }

	

};

exports.getCreditsPage = function(req, res, next){

	res.render('pages/credits', {
		user        : req.user,
		url         : req.url,
		title: "Credits"
	});

};


// Fancy console.log
function output (err, data) {
  console.dir (err || data, {
    depth: null,
    colors: true
  });
}
