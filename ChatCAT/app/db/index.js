'use strict';
const config = require('../config');
const logger = require('../logger');
const Mongoose = require('mongoose');

Mongoose.Promise = global.Promise;

Mongoose.connect(config.dbURI, { useNewUrlParser: true } , (err)=>{
	if (err) {
		console.log(err);
	}
	else {
		console.log('Database Connected')
	}
});

// // Log an error if the connection fails
// Mongoose.connection.on('error', error => {
// 	console.log('error', 'Mongoose connection error: ' + error);
// });

// Create a Schema that defines the structure for storing user data
const chatUser = new Mongoose.Schema({
	profileId: String,
	fullName: String,
	profilePic: String
});

// Turn the schema into a usable model
let userModel = Mongoose.model('chatUser', chatUser);

module.exports = {
	Mongoose,
	userModel
}