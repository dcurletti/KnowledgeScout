const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');


// Setup work and export for the JWT passport strategy
module.exports = () => {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = 'captain';
  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    console.log(jwt_payload)
    done(null, {a: 1});
  }));
};