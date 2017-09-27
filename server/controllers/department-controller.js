'use strict';


const path      = require('path');
// var validator = require('express-validator');

let app    = require(path.resolve(__dirname, '../server'));
// var Video     = server.models.VideoModel;
// var Example   = server.models.ExampleModel;


// Fancy console.log
function output (err, data) {
  console.dir (err || data, {
    depth: null,
    colors: true
  });
}
