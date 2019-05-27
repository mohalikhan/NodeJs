var express = require('express'),
    path = require('path'),
    config = require('./config'),
    aws = require('aws-sdk'),
    fs = require('fs'),
    os = require('os'),
    formidable = require('formidable'),
    gm = require('gm'),
    mongoose = require('mongoose')

mongoose.connect(config.dbURL, { useNewUrlParser: true, useFindAndModify: false }, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('Database Connected')
    }
});

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('hogan-express'));
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));
app.set('port', process.env.PORT || 3000);
app.set('host', config.host);

var s3 = new aws.S3({
    accessKeyId: config.S3AccessKey,
    secretAccessKey: config.S3Secret,
    params: { Bucket: config.S3Bucket }
});

var server = require('http').createServer(app);
var io = require('socket.io')(server);

require('./routes/routes.js')(express, app, formidable, fs, os, gm, mongoose, io, s3);

server.listen(app.get('port'), function () {
    console.log('PhotoGRID Runnng on port: ', + app.get('port'));
})