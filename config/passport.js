const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../models/User');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      User.findOne({
        email: email
      }).then(record => {
        if (!record) {
          return done(null, false, { message: 'That email is not registered' });//null -there is no error, user is false,
        }

        // Match password
        bcrypt.compare(password, record.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, record);
          } else {
            return done(null, false, { message: 'Incorrect credentials' });
          }
        });
      });
    })
  );

  passport.serializeUser(function(record, done) {
    done(null, record.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err,record) {
      done(err, record);
    });
  });
};
