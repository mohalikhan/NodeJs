var express = require('express'),
    path = require('path');

var app = new express();
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('hogan-express'));
app.set('view engine', 'html');

app.set('port', process.env_PORT || 3000);

var server = require('http').createServer(app);

require('./routes')(express, app);

server.listen(app.get('port'), () => {
    console.log("Server is running on port: ", + app.get('port'));
});