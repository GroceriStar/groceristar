'use strict';


const path    = require('path');

let app       = require(path.resolve(__dirname, '../server'));

const async   = require('async');
const _       = require('underscore');

let middlewarez = require(path.resolve(__dirname, '../like-middleware-helper'));
const Grocery = app.models.Grocery;
const User    = app.models.user;


exports.changeName = async (req, res, next) => {

    // var Grocery   = app.models.Grocery;
    var groceryId = req.params.groceryId;

    let grocery
    try {

      grocery = await Grocery.findById(groceryId);
    } catch (e) {
        //this will eventually be handled by your error handling middleware
        next(e) 
    }

    var renderObject = {
      user        : req.user,
      name: 'Change Grocery list name: ' + grocery.name,     

      // departments : response.data,    
      // description : d.desc,
      groceryId   : grocery.id
    };
    // console.log(grocery)

    res.render('pages/change-grocery-list-name', renderObject);

};

// :todo duplicated stuff
exports.postUpdateName = (req, res, next) => {
	var groceryId = req.body.groceryId;
  var name      = req.body.name;
  var Grocery   = app.models.Grocery;

  Grocery.findById(groceryId, {}, function(err, model){
    model.updateAttribute('name', name);
    res.redirect('/auth/account');
  });
};

exports.cloneGrocery = async (req, res, next) => {
    var userId    = req.user.id;    
    var groceryId = req.params.groceryId;  
    
    let grocery
    try {
      grocery = await Grocery.findById(groceryId, Grocery.queryNotHidden());

    } catch (e) {
      //this will eventually be handled by your error handling middleware
      next(e) 
    }

    let cloned
    try {   
      var newObject = Grocery.getObjectForClone(grocery);
      cloned = await Grocery.create(newObject);

    } catch (e) {
      //this will eventually be handled by your error handling middleware
      next(e) 
    }

    var options = {
      type  : 'attach',
      field : 'groceryIds',
      userId: userId,
      secondArray: [ cloned.id ]
    };
    User.proceed(options);

    res.redirect('/afterclone');
};

//:todo #182
exports.getCloneForm = async (req, res, next) => {
  var groceryId = req.body.groceryId;
  var ultimate  = await middlewarez(next);

  var renderObject = {
    user: req.user,
    title: "Clone Ultimate template and have your own list",

    groceryId : groceryId,
    ultimate  : ultimate
  };

  // console.log(renderObject)

      
  res.render('pages/grocery/clone-form-page', renderObject);
};

exports.postCloneForm = async (req, res, next) => {

  var groceryId = req.body.groceryId;
  var userId    = req.body.userId;
  var name      = req.body.name;
  var Grocery   = app.models.Grocery;

  // Grocery.findById(groceryId, {}, function(err, model){
  //   model.updateAttribute('name', name);
  //   // res.redirect('/auth/account');
  // });
    let grocery
    try {
      grocery = await Grocery.findById(groceryId, Grocery.queryNotHidden());

    } catch (e) {
        //this will eventually be handled by your error handling middleware
        next(e) 
    }

    let cloned
    try {   
      var newObject = Grocery.getObjectForClone(grocery);
      // console.log(newObject);
      newObject.name = name;
      cloned = await Grocery.create(newObject);
      console.log(cloned);
      console.log(userId)
    } catch (e) {
        //this will eventually be handled by your error handling middleware
        next(e) 
    }

    var options = {
      type  : 'attach',
      field : 'groceryIds',
      userId: userId,
      secondArray: [ cloned.id ]
    };
    User.proceed(options);

    res.redirect('/afterclone');


  // res.redirect('/afterclone');
};

exports.justRedirect = (req, res, next) => {
  res.redirect('/auth/account');
};

exports.createNewGrocery = (req, res, next) => {
    // console.log( req.user.id );
    var Grocery = app.models.Grocery;
    var data = {
      title: data.title,
      desc:  data.desc,
      slug:  '',
      img :  '',
      // departmentIds: [], // not sure if we need this
      // hideThisIds:   [],
    }
    Grocery.createnew(req.user.id, data, function(){});
    // res.redirect('/');
};


exports.removeGrocery = (req, res, next) => {

  var groceryId = req.params.groceryId;
  var userId    = req.user.id;    
  
  var Grocery   = app.models.Grocery;
  var User   = app.models.user;

  // this is a duplicated function from Grocery :todo think about it, real talk   
  var options = {
    type  : 'detach',
    field : 'groceryIds',
    userId: userId,
    secondArray: [ groceryId ]
  };
  User.proceed(options);

  Grocery.destroyById(groceryId, function(err){});
  res.redirect('/auth/account');

};

exports.viewGrocery = async (req, res, next) => {

      var groceryId  = req.params.groceryId;

      var ultimate   = await middlewarez(next);


      
      // var ultimateGL = {};
      var response   = {};
      // let admin
      // try {

      //   var User = app.models.user;

      //   // this is a duplicated code. :todo
      //   admin    = await User.findOne(User.queryUltimateAdmin());

      //   var json     = admin.toJSON();
      //   var ultimate = json.groceries[0];
      //   ultimateGL = {
      //     id: ultimate.id,
      //     name: ultimate.name
      //   };

        
      // } catch (e) {
      //   //this will eventually be handled by your error handling middleware
      //   next(e) 
      // }


      let grocery
      try {      
         var Grocery   = app.models.Grocery;
         
         // :todo this is not an awesome method. we're getting to much data by this query
         grocery  = await Grocery.findById(groceryId, Grocery.query1());

         // :todo this is not a best way to catch only departments name(main goal)
         // we can create another method, where we wouldn't have arraysfor ingredients and other stuff
         response = Grocery.convertCollectionData(grocery);


      } catch (e) {
        //this will eventually be handled by your error handling middleware
        next(e) 
      }

      // console.log(response);

      res.render('pages/view-grocery-new', {
        
        user: req.user,
        name: response.name,
        
        groceryId: groceryId,
        // departmentId: departmentId,

        messages: {},

        departments: response.data, // [data>> department >> ingredient]

        title: "Grocery list " + response.name,

        ultimate: ultimate,

        isGrocery: req.originalUrl.includes('/view/grocery/')        
      
      }); 

};





exports.shopping = async (req, res, next) => {
  var groceryId    = req.params.groceryId; 
  var departmentId = req.params.departmentId; 
  
  // This part is work for creating dropdown list only
  var response     = {};
  let grocery
  try {      
     var Grocery   = app.models.Grocery;
     
     // :todo this is not an awesome method. we're getting to much data by this query
     // :todo we're using more efficient method, but it must be tested better
     grocery  = await Grocery.findById(groceryId, Grocery.queryDepartmentsOnly());
     // console.log(grocery);
     // :todo this is not a best way to catch only departments name(main goal)
     // we can create another method, where we wouldn't have arraysfor ingredients and other stuff
     response = Grocery.convertCollectionDataEfficient(grocery);
     // console.log(response.data);

  } catch (e) {
    //this will eventually be handled by your error handling middleware
    next(e) 
  }


  // I think this is can be improved
  // this is a duplicated code
  let grocery2
  let ingredients
  try {      
     var Grocery   = app.models.Grocery;

     grocery2  = await Grocery.findById(groceryId, 
                    Grocery.queryOneDepartment(departmentId)
                  );
     ingredients = Grocery.convertDepartmentItems(grocery2);

  } catch (e) {
    //this will eventually be handled by your error handling middleware
    next(e) 
  }


  // This is another bad functionality, written for this method.
  let ultimate = await middlewarez(next);
  

  let renderObject = {
        user        : req.user,
        url         : req.url,
        groceryId   : groceryId,
        departmentId: departmentId,
        name        : response.name,
        departments : response.data,

        list        : ingredients,

        isUltimate  : (ultimate.id == groceryId) ? 1 : 0

  }
  
  res.render('pages/shopping/shopping-list', renderObject);


};

// Fancy console.log
function output (err, data) {
  console.dir (err || data, {
    depth: null,
    colors: true
  });
}

