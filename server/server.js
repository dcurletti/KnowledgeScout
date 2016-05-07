const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const r = require('./db/db.js');
const path = require('path');
const request = require('superagent');
const morgan = require('morgan');

const port = process.env.PORT || 3000;

app.use(morgan('dev'));

server.listen(port);

app.route('/').get((req, res) => {
  res.sendFile(path.join(__dirname, '../', 'client/index.html'));
});

app.route('/seed').get((req, res) => {
  const seed = require('./db/seed');
  seed();
  res.json({status: 'wahoo'})
});

let code;

app.get('/auth', function (req, res) {
  const params = {
    consumer_key: '54280-6fe5d1478443e4a2cae230bd',
    redirect_uri: 'http://localhost:3000/callback'
  };

  request
      .post('https://getpocket.com/v3/oauth/request')
      .send(params)
      .end(function (err, response) {
        if (err) console.log('ERROR', err);

        code = response.body.code;
        console.log('Code: ', code)

        let pocketURL = `https://getpocket.com/auth/authorize?request_token=${code}&redirect_uri=${'http://localhost:3000/callback'}`;

        res.redirect(pocketURL);
      })
});




app.get('/callback', function (req, res) {
  const params = {
    consumer_key: '54280-6fe5d1478443e4a2cae230bd',
    code: code
  };

  request
      .post('https://getpocket.com/v3/oauth/authorize')
      .send(params)
      .end(function(err, newRes) {
        console.log('access_token: ', newRes.body.access_token);
        res.redirect('/dashboard')
      })
});

app.route('/dashboard').get((req, res) => {
  res.sendFile(path.join(__dirname, '../', 'client/dashboard.html'));
});







// API ROUTES -------------------

// get an instance of the router for api routes
var apiRoutes = express.Router();

// TODO: route to authenticate a user (POST http://localhost:8080/api/authenticate)

apiRoutes.get('/authenticate', (req, res) => {
  res.json({message: 'Auth Token Granted', token: 'meow'})
});



// TODO: route middleware to verify a token

// route to show a random message (GET http://localhost:8080/api/)
apiRoutes.get('/test', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);