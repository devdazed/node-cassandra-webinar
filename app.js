
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    user = require('./routes/user'),
    http = require('http'),
    path = require('path');

var app = express();

/**
 *
 * Keyspace setup:
 *
 *     CREATE KEYSPACE webinar
 *       WITH strategy_class=SimpleStrategy
 *       AND strategy_options:replication_factor=1;
 *
 *     USE webinar;
 *
 *     CREATE COLUMNFAMILY users (email text, first_name text, last_name text, PRIMARY KEY (email));
 */

var helenus = require('helenus'),
  pool = new helenus.ConnectionPool({
    hosts      : ['localhost:9160'],
    keyspace   : 'webinar',
    cqlVersion : '3.0.0'
  });

pool.connect(function(err){
  if(err){
    throw(err);
  }

  app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('cassandra', pool);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
  });

  app.configure('development', function(){
    app.use(express.errorHandler());
  });

  app.get('/', routes.index);
  app.get('/users', user.list);

  http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
  });
});
