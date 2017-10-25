'use strict';


const path      = require('path');
// var validator = require('express-validator');

let app    = require(path.resolve(__dirname, '../server'));
// var Video     = server.models.VideoModel;
// var Example   = server.models.ExampleModel;

let middlewarez = require(path.resolve(__dirname, '../like-middleware-helper'));
const Raven = require('raven');
Raven.config('https://6c8ba2737aae4d81908677e4dba9be3f:26c83aa1a38a42cdbf0beea41a82cacf@sentry.io/231031').install();
exports.getHomepage = async (req, res, next) => {

      var ultimateGL = {};

      var ultimateGL2 = await middlewarez(next);

      let admin
      try {

        var User = app.models.user;
        // var groceryId = req.params.groceryId;  

        // this is a duplicated code. :todo
        admin    = await User.findOne(User.queryUltimateAdmin());

        var json     = admin.toJSON();
        var ultimate = json.groceries[0];
        ultimateGL = {
          id: ultimate.id,
          name: ultimate.name
        };

        // console.log(data);

        res.render('pages/static/landing', {
          user: req.user,
          url : req.url,
          
          title: "Online Grocery Lists", //:todo

          ultimate: ultimateGL
          
        });

        
      } catch (e) {
         Raven.captureException(e);
        //this will eventually be handled by your error handling middleware
        next(e) 
      }

	

};

exports.getCreditsPage = async function(req, res, next){
  // console.log(req.user);
  
  var ultimate = await middlewarez(next);
// console.log(z)

  res.render('pages/static/credits', {
    user        : req.user,
    url         : req.url,
    title: "Credits",

    ultimate: ultimate
  });

};

exports.getPrivacyPage = async function(req, res, next){
  console.log(req.url);
  console.log(req.user);

  var ultimate = await middlewarez(next);

  res.render('pages/static/privacy', {
    user        : req.user,
    url         : req.url,
  
    title: "Groceristar Privacy Policy",
    companyName: "Groceristar",
    ultimate: ultimate
  });

};

exports.getTermsPage = async function(req, res, next){
  console.log(req.user);

  var ultimate = await middlewarez(next);

  res.render('pages/static/terms', {
    user        : req.user,
    url         : req.url,
    title: "Terms & Conditions",
    companyName: "Groceristar",

    ultimate: ultimate
  });

};


// Fancy console.log
function output (err, data) {
  console.dir (err || data, {
    depth: null,
    colors: true
  });
}
