var token = jwt.sign(user, config.secret, {
  expiresIn: 10080 // in seconds
});
res.json({ success: true, token: 'JWT ' + token });