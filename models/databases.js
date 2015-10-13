var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://planosassessoria3:ra3800@pgsql.planosassessoria.com.br/planosassessoria3';
var client = new pg.Client(connectionString);
client.connect();
