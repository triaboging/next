

   const CLIENTID = '351948329455-d4mk2er139at2smp2rkp4audns1frkcs.apps.googleusercontent.com'
   const CLIENTSECRET =  'XUU-03VJVb2N-EY6nm2qG_zB'
   const CALLBACKURL = 'http://localhost:5000/google/callback'

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
passport.use(new GoogleStrategy({
  clientID: CLIENTID,
  clientSecret: CLIENTSECRET,
  callbackURL: CALLBACKURL,
  passReqToCallback: true,
  scope: [ 'profile' ]
},
function(request, accessToken, refreshToken, profile, done) {
  return done(null, profile, request);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
