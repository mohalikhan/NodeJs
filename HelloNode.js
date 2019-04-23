'use strict';

const http = require('http');

http
    .createServer((req, res) => {
        res.writeHead(200, {'Content-type': 'text/html'});
        res.end('<h1>My server is started</h1>');
    })
    .listen(3500, () => {
        console.log("Server is started at port 3500")
    })