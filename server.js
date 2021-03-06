'use strict';

let express = require('express');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

let api = require('./routes/api');
let auth = require('./config/auth');

let port = process.env.PORT || 3000;
let database = process.env.MONGOLAB_URI || 'mongodb://localhost/itemsExchange';

console.log('Connecting to mongodb: ', database);
mongoose.connect(database);

let app = express();
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(auth.auth);
app.use(auth.enableCORS);

app.use('/api/user', api);

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


process.on('exit', (code) => {
  mongoose.disconnect();
  console.log('About to exit with code:', code);
});

let listener = app.listen(port);

console.log('express in listening on port: ' + port);
