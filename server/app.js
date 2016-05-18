require('./app.babel'); // babel registration (runtime transpilation for node)
// const io = require('socket.io')(server);
// const request = require('superagent');
const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./../shared/config');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));


// app.use(passport.initialize());

// require('./config/passport')();

// const apiRoutes = require('./routes/api_routes');
const standardRoutes = require('./routes/public_routes');
const ssrRoute = require('./../client/ssr_route');
// const apiAuthRoutes = require('./routes/api_auth_routes');

// app.use('/api', apiAuthRoutes);
// app.use(standardRoutes);
app.use(express.static('../static'));
app.use(ssrRoute);
// app.use('/api', passport.authenticate('jwt', { session: false, failureRedirect: '/sign_in'}), apiRoutes);

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




