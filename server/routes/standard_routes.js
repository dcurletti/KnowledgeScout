const app = require('../app');
const path = require('path');

app.route('/sign_up').get((req, res) => {
    res.sendFile(path.join(__dirname, '../../', 'client/sign_up.html'));
});