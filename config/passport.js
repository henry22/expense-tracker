// config/passport.js
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

module.exports = passport => {
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({
      email: email
    }).then(user => {
      if (!user) {
        return done(null, false, {message: 'email is not register'})
      }

      if (user.password !== password) {
        return done(null, false, {message: 'password is not correct'})
      }

      return done(null, user)
    })
  }))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .exec((err, user) => {
        done(err, user)
      })
  })
}