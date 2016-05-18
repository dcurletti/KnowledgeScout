const app = require('express')();
const path = require('path');

app.route('/').get((req, res) => {
    res.sendFile(path.join(__dirname, '../../', 'client/dashboard.html'));
});

// app.route('/sign_up').get((req, res) => {
//     res.sendFile(path.join(__dirname, '../../', 'client/sign_up.html'));
// });

app.route('/sign_in').get((req, res) => {
    res.sendFile(path.join(__dirname, '../../', 'client/sign_in.html'));
});

module.exports = app;