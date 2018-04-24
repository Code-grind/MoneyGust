
let passport = require('passport');
let Schema = require('../database/schema');
let LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function (user,done) {
    console.log("Sserialize");
    console.log(user.Type);
    console.log(user.id);
    done(null,{
        id: user.id,
        type: user.Type
    });
});

passport.deserializeUser(function (user,done) {

    if(user.type==='Startup')
    {
        console.log("startupdeserialize");
        Schema.startup.findById(user.id,function (err,user) {
            console.log("start");
            done(err,user);
        });
    }
    else if (user.type==='Investor'){
        console.log("investordeserialize");
        Schema.investor.findById(user.id,function (err,user) {
            console.log("start");
            done(err,user);
        });
    }
});

passport.use('local.Startup',new LocalStrategy({
    usernameField: 'Email',
    passwordField: 'Password',
},function (username,password,done) {
    console.log("pass " + username);
    console.log("pass " + password);
    Schema.startup.findOne({'Email': username}, function (err, user) {
        if (err) {
            return done(err);
        }
        if(user==null) {
            console.log("StaMail");
            return done(null,false,{ message: 'Incorrect Email' })
        }
        if (user.Password !== password) {
            console.log("Stapass");
            return done(null, false, {message: 'Wrong password'})
        }
        return done(null, user);
    });
}));

passport.use('local.Investor',new LocalStrategy({
    usernameField: 'Email',
    passwordField: 'Password',
},function (username,password,done) {
    console.log("pass " + username);
    console.log("pass " + password);
    Schema.investor.findOne({'Email': username}, function (err, user) {
        if (err) {
            return done(err);
        }
        if(user==null) {
            console.log("StaMail");
            return done(null,false,{ message: 'Incorrect Email' })
        }
        if (user.Password !== password) {
            console.log("Stapass");
            return done(null, false, {message: 'Wrong password'})
        }
        return done(null, user);
    });
}));