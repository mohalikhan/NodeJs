'use strict';
require('dotenv').load();
const Hapi = require('Hapi');
const server = new Hapi.Server();

// Define Server Config
server.connection({
    port: process.env.port || 3000
});


server.register([{
    register: require('inert')
}, {
    register: require('vision')
}, {
    register: require('good'),
    options: {
        opsInterval: 10000,
        reporters: [{
            reporter: require('good-file'),
            events: {
                log: '*',       
                ops: '*'
            },
            config: './applog.log'
        }]
    }
}, {
    register: require('./core'),
    options: {
        data: require('../data/studentData.json')
    }
}], error =>     {
    if (error) {
        console.log('Error : ', error);
        server.log('error', 'Error: ' + error);

    } else {
        server.start(() => {
            console.log('Server running on : ', server.info.uri);
            server.log('log', 'Server Stats: ' + server.info.uri);
        });
    }
});


