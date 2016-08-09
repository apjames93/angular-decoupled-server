var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helpers = require('./auth/helpers')

// (3) remove - var routes = require('./routes/index'); add next line
var api = require('./api/index');
var auth = require('./auth/index');


// (4.1) remove  var users = require('./routes/users');

var app = express();

// (4.2)view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//(4.3) app.use(express.static(path.join(__dirname, 'public')));
//3.2
app.use(helpers.authMiddleWare);

app.use('/auth',  auth);

// app.use('/api', helpers.ensureauthenticated, api);
app.use('/api', api);
// (4.4) app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    //(5.1)
    res.json( {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  //(5.2)
  res.json( {
    message: err.message,
    error: {}
  });
});


module.exports = app;
