// var JwtStrategy = require('passport-jwt').Strategy,
//     ExtractJwt = require('passport-jwt').ExtractJwt;
// var opts = {}
// opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
// opts.secretOrKey = 'captain';
// // opts.issuer = "accounts.examplesoft.com";
// // opts.audience = "yoursite.net";
// passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
//     User.findOne({id: jwt_payload.sub}, function(err, user) {
//         if (err) {
//             return done(err, false);
//         }
//         if (user) {
//             done(null, user);
//         } else {
//             done(null, false);
//             // or you could create a new account
//         }
//     });
// }));


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