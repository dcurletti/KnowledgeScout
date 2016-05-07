// const io = require('socket.io')(server);
// const path = require('path');
// const request = require('superagent');
const passport = require('passport');

const app = require('./app');

app.use(passport.initialize());

require('./config/passport')();
require('./routes/standard_routes');

const apiRoutes = require('./routes/api_routes');
const apiAuthRoutes = require('./routes/api_auth_routes');

app.use('/api', apiAuthRoutes);
app.use('/api', passport.authenticate('jwt', { session: false }), apiRoutes);

const server = require('http').Server(app);
const port = process.env.PORT || 3000;

server.listen(port);