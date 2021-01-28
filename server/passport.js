const LocalStrategy = require('passport-local').Strategy
const db = require('./db');

module.exports = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
      const user = db.user.login(username);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, db.user.findUser(user.username));
  })

}