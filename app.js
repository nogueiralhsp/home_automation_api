var createError = require('http-errors');
var express = require('express');
require('./src/db/mongoose')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");


var devicesRouter = require('./src/routes/devices')
var deviceStatusSchema = require('./src/routes/devices_status')
var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');
var testAPI = require('./src/routes/testAPI')



var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(devicesRouter);
app.use(deviceStatusSchema)
app.use(indexRouter);
app.use(usersRouter);
app.use(testAPI)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

  // res.render('error'); this was commented out to return only json as bellow
    res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

module.exports = app;
