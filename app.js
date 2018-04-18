let express = require('express');
let path = require('path');
//let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let passport = require('passport');
let session = require('express-session');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let starupSignup = require('./routes/startupSignup');
let investorSignup = require('./routes/investorSignup');


let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'dog is here',resave: false,saveUninitialized: false,
    expires: new Date(Date.now() + (30 * 86400 * 1000))}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'sementic')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/StartupSignup',starupSignup);
app.use('/InvestorSignup',investorSignup);


app.use('/success', function(req, res){
    console.log("sent");
    res.send(req.user);
});

app.get('/failure', function(req,res){
    res.send('failed');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
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
