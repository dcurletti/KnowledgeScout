let code;
app.route('/pocket_auth').get((req, res) => {
    const params = {
        consumer_key: '54280-6fe5d1478443e4a2cae230bd',
        redirect_uri: 'http://localhost:3000/pocket_callback'
    };

    request
        .post('https://getpocket.com/v3/oauth/request')
        .send(params)
        .end(function (err, response) {
            if (err) console.log('ERROR', err);

            code = response.body.code;
            console.log('Code: ', code);

            let pocketURL = `https://getpocket.com/auth/authorize?request_token=${code}&redirect_uri=${params.redirect_uri}`;

            res.redirect(pocketURL);
        })
});

app.route('/pocket_callback').get((req, res) => {
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
