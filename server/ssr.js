const path = require('path');
const config = require('./../shared/config');

const rootDir = path.resolve(__dirname, '..');
// /**
//  * Define isomorphic constants.
//  */
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = true;  // <----- DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING
global.__DEVELOPMENT__ = !!!(config.isProduction);

// if (__DEVELOPMENT__) {
//   if (!require('piping')({
//         hook: true,
//         ignore: /(\/\.|~$|\.json|\.scss$)/i
//       })) {
//     return;
//   }
// }
//
// // https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/webpack-isomorphic-tools'))
    .development(__DEVELOPMENT__)
    .server(rootDir, function() {
      require('./app');
    });

