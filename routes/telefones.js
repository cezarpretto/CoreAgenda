var express = require('express');
var router = express.Router();
var pg = require('pg');
var connString = 'postgres://planosassessoria3:ra3800@pgsql.planosassessoria.com.br/planosassessoria3';
var Telefone = require('../models/telefone.js');

router.get('/', function(req, res, next){
  var results = [];

  pg.connect(connString, function(err, client, done){
    if(err){
      done();
      console.error(err);
      return res.status(500).json({success: false, data: err});
    }

    var query = client.query("select id, nome, telefone, endereco from telefones");
    query.on('row', function(row){
      results.push(row);
    });

    query.on('end', function(){
      done();
      return res.json(results);
    });
  });
});

router.delete('/:tel_id', function(req, res, next){
  var results = [];
  var id = req.params.tel_id;

  pg.connect(connString, function(err, client, done){
    if(err){
      done();
      console.error(err);
      return res.status(500).json({success: false, data: err});
    }

    client.query('delete from telefones where id = $1', [id]);
    var query = client.query("select id, nome, telefone, endereco from telefones");
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
  var results = [];
  //var data = req.body;
  var data = new Telefone();
  data.nome = req.body.nome;
  data.telefone = req.body.telefone;
  data.endereco = req.body.endereco;

  pg.connect(connString, function(err, client, done){
    if(err){
      done();
      console.error(err);
      return res.status(500).json({success: false, data: err});
    }
    try {
      client.query('insert into telefones (nome, telefone, endereco) values ($1, $2, $3)', [data.nome, data.telefone, data.endereco]);
      var query = client.query("select id, nome, telefone, endereco from telefones");
      query.on('row', function(row){
        results.push(row);
      });

      query.on('end', function(){
        done();
        return res.json(results);
      });
    } catch (e) {
      console.log(e);
    }
  });
});

router.put('/', function(req, res, next){
  var results = [];
  var data = req.body;

  pg.connect(connString, function(err, client, done){
    if(err){
      done();
      console.error(err);
      return res.status(500).json({success: false, data: err});
    }

    client.query('update telefones set nome = $1, telefone = $2, endereco = $3 where id = $4', [data.nome, data.telefone, data.endereco, data.id]);
    var query = client.query("select id, nome, telefone, endereco from telefones");
    query.on('row', function(row){
      results.push(row);
    });

    query.on('end', function(){
      done();
      return res.json(results);
    });
  });
});

module.exports = router;
