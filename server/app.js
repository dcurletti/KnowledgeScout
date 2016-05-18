require('./app.babel'); // babel registration (runtime transpilation for node)
// const io = require('socket.io')(server);
// const request = require('superagent');
const path = require('path');
const app = require('express')();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config/config');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(passport.initialize());






const rootDir = path.resolve(__dirname, '..');
// /**
//  * Define isomorphic constants.
//  */
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = false;  // <----- DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING
global.__DEVELOPMENT__ = !!(config.isProduction);

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
      require('../src/server');
    });
















// require('./config/passport')();

const apiRoutes = require('./routes/api_routes');
const standardRoutes = require('./routes/public_routes');
const apiAuthRoutes = require('./routes/api_auth_routes');

app.use('/api', apiAuthRoutes);
app.use(standardRoutes);
app.use('/api', passport.authenticate('jwt', { session: false, failureRedirect: '/sign_in'}), apiRoutes);

const server = require('http').Server(app);

if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('==> 💻  %s is running. Open http://%s:%s in a browser to view the app.', config.app.title, config.host, config.port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}




