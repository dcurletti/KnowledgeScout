// API ROUTES -------------------

// get an instance of the router for api routes
const express = require('express');
var apiRoutes = express.Router();
var jwt = require('jsonwebtoken');

// TODO: route to authenticate a user (POST http://localhost:8080/api/authenticate)

// Authenticate the user and get a JSON Web Token to include in the header of future requests.
apiRoutes.route('/authenticate').post((req, res) => {
  // Create token if the password matched and no error was thrown
  var token = jwt.sign({a: 1}, 'captain', {
    expiresIn: 10080 // in seconds
  });
  res.json({ success: true, token: 'JWT ' + token });
});



module.exports = apiRoutes;