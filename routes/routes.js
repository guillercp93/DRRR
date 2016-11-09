//import models
var path = require("path");
var models = require(path.join('..', 'models', 'models'))();

var routes = function(app) {
	app.get('/', function(req, res) {
		res.send("Hello World!");
	});

	app.post('/auth/register', function(req, res) {
		console.log("entro");
		var now = new Date();

		var user = new models.User({
			'profile.username': req.body.username,
			'profile.password': req.body.password,
			'profile.email': req.body.email,
			'profile.name': req.body.name,
			'profile.lastname': req.body.lastname,
			'profile.picture': req.body.avatar,
			'profile.color': req.body.color,
			'profile.created_at': now,
			'profile.updated_at': now,
			'profile.last_login_at': now
		});
		console.log("user is defined");
		user.save().then(function(doc, err) {
			console.log(doc);
			if (err) {
				return res.send(err);
			}
		});
		console.log("exec save");
		return res.send("the user is created successfull!");
	});
}

module.exports = routes;