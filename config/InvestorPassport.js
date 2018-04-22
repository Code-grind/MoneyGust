
let passport = require('passport');
let Schema = require('../database/schema');
let LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function (user,done) {
    console.log("Iserialize");
    done(null,user.id);
});

passport.deserializeUser(function (id,done) {
    console.log("investordeserialize");
    Schema.investor.findById(id,function (err,Investor) {
        console.log("inv");
        done(err,Investor);
    })
});

passport.use('local.investor',new LocalStrategy({
    usernameField: 'Email',
    passwordField: 'Password',
},function (username,password,done) {
    console.log("pass " + username);
    console.log("pass " + password);
    Schema.investor.findOne({'Email': username}, function (err, Investor) {
        if (err) {
            return done(err);
        }
        if(Investor==null) {
            console.log("InvMail");
            return done(null,false,{ message: 'Incorrect Email' })
        }
        if (Investor.Password !== password) {
            console.log("Invpass");
            return done(null, false, {message: 'Wrong password'})
        }
        return done(null, Investor);
    });
}));

