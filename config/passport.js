// config/passport.js
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const db = require('../models')
const User = db.User
const bcrypt = require('bcryptjs')

module.exports = passport => {
    // local strategy
    passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        User.findOne({
            email: email
        }).then(user => {
            if (!user) {
                return done(null, false, { message: 'email is not register' })
            }

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err
                if (isMatch) {
                    return done(null, user)
                } else {
                    return done(null, false, { message: 'password is not correct' })
                }
            })
        })
    }))

    // facebook strategy
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK,
        profileFields: ['email', 'displayName']
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({
            email: profile._json.email
        }).then(user => {
            if (!user) {
                let randomPassword = Math.random().toString(36).slice(-8)

                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw err
                    bcrypt.hash(randomPassword, salt, (err, hash) => {
                        const newUser = new User({
                            name: profile._json.name,
                            email: profile._json.email,
                            password: hash
                        })

                        newUser
                            .save()
                            .then(user => {
                                return done(null, user)
                            })
                            .catch(err => console.error(err))
                    })
                })
            } else {
                return done(null, user)
            }
        })
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        User.findByPk(id)
            .then(user => {
                done(null, user)
            })
            .catch(err => {
                done(err, null)
            })
    })
}