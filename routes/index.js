var express = require('express');
var utils = require('../sort-algorithms/search-engine.min');
var router = express.Router();

/* GET home page . */
router.get('/',ensureAuthenticated, function(req, res, next) {
  res.render('index', { title: 'Members'});
});
function ensureAuthenticated(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/users/login')
}
module.exports = router;
