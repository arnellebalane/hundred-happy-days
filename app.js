var express = require('express');
var http = require('http');
var path = require('path');
var stylus = require('stylus');
var config = require('./config')();

var pages = require('./routes/pages');

var app = express();

app.set('port', config.port || process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('loremipsumdolorsitamet'));
app.use(express.session({ secret: 'loremipsumdolorsitamet' }));
app.use(app.router);
app.use(stylus.middleware({
  src: './assets',
  dest: './public',
  compress: true
}));
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

app.get('/', pages.home);