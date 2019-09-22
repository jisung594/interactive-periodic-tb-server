var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
let elementsData = require('./PeriodicTableJSON.json')

// var bodyParser = require("body-parser");
// require('dotenv').config()

// // --------------
// var db;
var mongodb = require('mongodb');
// var MongoClient = mongodb.MongoClient;
//
// mongodb.MongoClient.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/periodic-table', function (err, client) {
//   if (err) {
//     console.log(err);
//     process.exit(1);
//   }
//
//   db = client.db();
// // --------------



var routes = require('./routes/index');
const router = express.Router();

var app = express();
// app.use(bodyParser.json());

// ***** mongod ******
// PORT NUMBER: 27017
// mongoose.connect(process.env.MONGODB_URI  || 'mongodb://localhost:27017/periodic-table')
mongoose.connect(process.env.MONGOLAB_URI  || 'mongodb://localhost:27017/periodic-table')

// let db = mongoose.connection

// router.get('/api/elements', (req,res) => {
//   console.log("I received a GET request");
//
//   // Element.find({})
//   //   .then(data => res.json(data))
//   //   // .then(data => res.json(data))
//
//   // db.collection('elements').find({}, function(err, data){
//   //   // console.log("Getting data from db")
//   //   // console.log(data)
//   //   res.json(data)
//   // })
//
//   // elementsData.find((err, data) => {
//   //   if (err) return res.json({ success: false, error: err });
//   //   return res.json({ success: true, data: data });
//   // });
// })



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', routes);
// app.use('/users', usersRouter);
app.use('/api/elements', require('./routes/api/elements'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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


// PORT
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Listening on port ${port}`))



module.exports = app;
