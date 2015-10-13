var express = require('express');
var router = express.Router();
var pg = require('pg');
var connString = 'postgres://planosassessoria3:ra3800@pgsql.planosassessoria.com.br/planosassessoria3';

/* GET users listing. */
router.get('/', function(req, res, next) {
  var results = [];
  pg.connect(connString, function(err, client, done){
    if(err){
      done();
      console.error(err);
      return res.status(500).json({success: false, data: err});
    }

    var query = client.query('select * from usuarios');
    query.on('row', function(row){
      results.push(row);
    });

    query.on('end', function(){
      done();
      return res.json(results);
    });
  });
});

router.post('/', function(req, res, next){
  var data = req.body;
  var results = [];

  pg.connect(connString, function(err, client, done){
    if(err){
      done();
      console.error(err);
      return res.status(500).json({success: false, data: err});
    }

    client.query('insert into usuarios(nome, username, password) values ($1, $2, $3)', [data.nome, data.username, data.password]);
    var query = client.query('select * from usuarios');

    query.on('row', function(row){
      results.push(row);
    });

    query.on('end', function(){
      done();
      return res.json(results);
    })
  });
});

module.exports = router;
