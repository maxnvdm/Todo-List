var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var keys = require('./keys');
var User = require('../models/user-model');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        // options for the google strategy
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret

    }, (accessToken, refreshToken, profile, email, done) => {
        // check if user already exists in db
        User.findOne({googleId: email.id}).then((currentUser) => { 
            if(currentUser){
                // user already signed up
                done(null, currentUser);
            } else {
                // if not, create new user in db
                new User({
                    username: email.displayName,
                    googleId: email.id
                }).save().then((newUser) => {
                    done(null, newUser);
                });
            }
        });        
    })
);
