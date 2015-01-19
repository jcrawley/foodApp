
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var https = require('https');
var path = require('path');
var app = express();
var os = require('os');

console.log(os.networkInterfaces());

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.get("/", function (req, res) {
    res.render("index", {
      title: "What you hungry for?",
      scripts: [
        "/javascripts/sidebar.js",
        "/javascripts/ingredients.js"
      ]
    });
});

app.get("/rest/search/:params", function (req, res) {
	var sender = res;
	var options = {
	  host: 'food2fork.com/api/search',
	  port: 8080,
	  path: '?key=7a8a6556cf1f21ca48f687a2115f5f7f&q=' + req.params.params,
	  method: 'GET'

	};
	console.log(req.params.params);
	http.get('http://food2fork.com/api/search?key=7a8a6556cf1f21ca48f687a2115f5f7f&q=' + req.params.params, function(res) {

	  console.log('STATUS: ' + res.statusCode);
	  console.log('HEADERS: ' + JSON.stringify(res.headers));
	  res.setEncoding('utf8');
	  var response = '';
	  res.on('data', function (chunk) {
	    response += chunk;
	  });
	  res.on('end', function (){
	  	sender.json(response);
	  });
	}).end();
});
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
