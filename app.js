const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// Load routes into variables
const index = require('./routes/index');
const shippingCost = require('./routes/shippingCost'); //G: shippingCost hinzugefügt
const discount = require('./routes/discount'); //G: discount hinzugefügt
const authenticate = require('./routes/authenticate').router; //G: authenticate hinzugefügt
const routing = require('./routes/routing'); //G: routing hinzugefügt

const app = express();

// Template engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Generic application setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configure routes in Express webserver
app.use('/', index);
app.use('/shippingCost', shippingCost); //G: shippingCost hinzugefügt
app.use('/discount', discount); //G: discount hinzugefügt
app.use('/authenticate', authenticate); //G: authenticate hinzugefügt
app.use('/routing', routing); //G: routing hinzugefügt

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
