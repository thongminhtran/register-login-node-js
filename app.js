var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var requirements = require('./requirements');
// var bubbleSort = require('./sort-algorithms/bubble-sort');
// var insertionSort = require('./sort-algorithms/insertion-sort');
// var mergeSort = require('./sort-algorithms/merge-sort');
// var selectionSort = require('./sort-algorithms/selection-sort');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Handle sessions
app.use(session({
  secret:'secret',
  saveUninitialized:true,
  resave:true
}));

//passport
app.use(passport.initialize());
app.use(passport.session());

//validator
const { check, validationResult } = require('express-validator');

app.post('/', [
  // username must be an email
  check('username').isEmail(),
  // password must be at least 5 chars long
  check('password').isLength({ min: 5 })
], (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  User.create({
    username: req.body.username,
    password: req.body.password
  }).then(user => res.json(user));
});

app.use(require('connect-flash')());
app.use(function(req,res,next){
  res.locals.messages=require('express-messages')(req,res);
  next();
});
app.get('*',function(req,res,next){
  res.locals.person=req.user || null;
next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.listen(5001,function(){
  console.log('listening on port 5001');
});
module.exports = app;