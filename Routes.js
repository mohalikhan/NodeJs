'use strict';

const http = require('http');
const url = require('url');
const qs = require('querystring');

let routes = {
    'GET': {
        '/' : (req, res) => {
            res.writeHead(200, {'Content-type' :  'text/html'});
            res.end('<h1>Server is running with GET request</h1>');       
        },
        '/api/getinfo' : (req, res) => {
            res.writeHead(200, {'Content-type' :  'application/json'});
            res.end(JSON.stringify({test:1}));
        }
    },
    'POST': {
        '/api/login' : (req, res) => {
            let body = '';
            req.on('data', data => {
                body += data;
            });
            req.on('end', () => {
                var params = qs.parse(body);
                console.log(params);
                res.end();
            });
        }
    },
    'NA': (req, res) => {
        res.writeHead(404, {'Content-type' :  'text/html'});
        res.end('Content not found.');       
    }
}

function router(req, res) {
    const baseURI = url.parse(req.url)

    let route = routes[req.method][baseURI.pathname];

    if (route != undefined) {
        route(req, res);
    } else {
        routes['NA'](req, res);
    }
}

http.createServer(router).listen(3500, () => {
    console.log("Server is listening at port 3500.");
})

