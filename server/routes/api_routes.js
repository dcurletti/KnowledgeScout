// API ROUTES -------------------

// get an instance of the router for api routes
const express = require('express');
var apiRoutes = express.Router();

// TODO: route to authenticate a user (POST http://localhost:8080/api/authenticate)

apiRoutes.get('/something', (req, res) => {
  res.json({message: 'Auth Token Granted', token: 'meow'})
});

module.exports = apiRoutes;