require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

passport.use(
    new GoogleStrategy({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL,

    }, function(accessToken, refreshToken, profile, done){
        // Storing id, name, email form google profile in a object
        const user = {
          id: profile.id,
          username: profile.displayName,
          email: profile.emails[0].value,
        };
        done(null, user)
    })
);

passport.serializeUser((user, done)=> {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
