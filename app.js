let express = require('express');
let path = require('path');
//let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let passport = require('passport');
let expressValidator = require('express-validator');
let session = require('express-session');
let bcrypt = require('bcrypt');
const saltRounds = 10;


require('./config/passport');
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let starupSignup = require('./routes/startupSignup');
let investorSignup = require('./routes/investorSignup');
let Login = require('./routes/login');
let investorList = require('./routes/investorlist');
let startupList = require('./routes/startuplist');
let notifications = require('./routes/notification');
let StartupDashboard = require('./routes/StartupDashboard');
let InvestorDashboard = require('./routes/InvestorDashboard');
let StartupProfile = require('./routes/StartupProfile');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(session({secret: 'dog is here',resave: false,saveUninitialized: false,
    expires: new Date(Date.now() + (30 * 86400 * 1000))}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'semantic')));
app.use(express.static(path.join(__dirname, 'node_modules/@glidejs/glide/dist')));
if (app.get('env') === 'development') {
    app.locals.pretty = true;
}

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/StartupSignup',starupSignup);
app.use('/InvestorSignup',investorSignup);
app.use('/login',Login);
app.use('/investorList',investorList);
app.use('/startupList',startupList);
app.use('/StartupDashboard',StartupDashboard);
app.use('/InvestorDashboard',InvestorDashboard);
app.use('/notification',notifications);
app.use('/StartupProfile',StartupProfile);

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

app.use('/success', function(req, res){
    console.log("sent");
    res.send(req.user);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  res.render('404 Not found');
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;