var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
let elementsData = require('./PeriodicTableJSON.json')
require('dotenv').config();


var routes = require('./routes/index');
const router = express.Router();

var app = express();

// ***** mongod ******
// PORT NUMBER: 27017
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
// mongoose.connect('mongodb://localhost:27017/periodic-table')

let db = mongoose.connection



// // ----------------------
// let Element = require('./models/element.js')
//
// app.get('/api/elements', (req,res) => {
//   // Element.find((elements) => {
//   //   res.send(elements)
//   // })
//   let elements = Element.find()
//   res.send(elements)
// })
// // ----------------------




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
app.use('/api/elements', require('./routes/api/elements'));


let Element = require('../../models/element.js')


app.get('/api/elements', (req,res,error) => {
  console.log("I received a GET request");

  Element.find()
    .then(data => res.json(data))
    .catch(console.log(error))
})



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
