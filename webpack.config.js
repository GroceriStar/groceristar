var webpack = require('webpack');
const path  = require('path');

var paths = {
    projectRoot: __dirname,
    appRoot: path.join(__dirname, 'server'),
    buildDir: 'build',
    buildRoot: path.join(__dirname, 'build')
};

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};


// module.exports = {
//     context: paths.projectRoot,
//     entry: './server/server.js',
//     target: 'node',
//     devtool: 'source-map',
// //        output: {
// //   filename: 'bundle.js',
// //   path: path.resolve(__dirname, 'dist')
// // }
    
// };