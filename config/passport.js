
let passport = require('passport');
let Schema = require('../database/schema');
let LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function (user,done) {
    console.log("serialize");
    done(null,user.id);
});

passport.deserializeUser(function (id,done) {
    console.log("deserialize");
    Schema.startup.findById(id,function (err,user) {
        done(err,user);
    })
});

passport.use('local.signup',new LocalStrategy({
    usernameField: 'Email',
    passwordField: 'Password',
},function (username,password,done) {
    console.log("pass " + username);
    console.log("pass " + password);
    Schema.Users.findOne({'Email': username},function (err,user) {
        if(err) {
            return done(err);
        }
        if(user==null) {
            console.log("Imail");
            return done(null,false,{ message: 'Incorrect Email' })
        }
        if(user.Password!==password) {
            console.log("Ipass");
            return done(null,false,{ message: 'Wrong password' })
        }
        return done(null,user);
    })
}));