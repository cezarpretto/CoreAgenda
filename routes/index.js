var express = require('express');
var router = express.Router();
var pg = require('pg');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/v1/users', function(req, res){
  var results = [];

  pg.connect(connectionString, function(err, client, done){
    if(err){

    }
  });
});

module.exports = router;
