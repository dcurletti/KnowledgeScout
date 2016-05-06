const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const r = require('rethinkdb');
const path = require('path');
const request = require('superagent');



let connection = null;



r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
	if (err) throw err;
	connection = conn;
	console.log('connected to db')
});

server.listen(3000);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../', 'client/index.html'));
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

app.get('/dashboard', function (req, res) {
  res.sendFile(path.join(__dirname, '../', 'client/dashboard.html'));
});

