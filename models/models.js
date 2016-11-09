var mongoose = require("mongoose");

module.exports = function() {
	mongoose.connect('mongodb://localhost:27017/drrr');

	var User = mongoose.model('User', require('./user'), 'users');

	var models = {
		User : User
	};

	return models;
}