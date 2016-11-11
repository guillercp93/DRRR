"use strict";

var mongoose = require("mongoose");

module.exports = function() {
	mongoose.connect('mongodb://127.0.0.1:27017/drrr');

	var User = mongoose.model('User', require('./user'), 'users');

	var models = {
		User : User
	};

	return models;
};