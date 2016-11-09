var mongoose = require('mongoose'),
	bcrypt = require('bcryptjs'),
    SALT_WORK_FACTOR = 10;

var User = new mongoose.Schema({
	profile : {
		username : {
			type: String,
			require: true,
			unique: true
		},
		password: {
			type: String,
			require: true
		},
		picture: {
			type: String,
			require: true,
			match: /^http:\/\//i
		},
		name: String,
		lastname: String,
		email: {
			type: String,
			require: true,
			match: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
		},
		location: String,
		created_at: Date,
		updated_at: Date,
		last_login_at: Date,
		color: {
			type: String,
			require: true,
			match: /^#/i
		}

	}
});

User.pre('save', function(next) {
	var user = this;
	//only hash password if it is modified or new
	if (!user.isModified('profile.password')) {
		return next();
	}

	//generate salt
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if (err) {
			console.log("err 1", err);
			return next(err);
		}
		//hash the password using our new salt
		bcrypt.hash(user.profile.password, salt, function(err, hash) {
			if (err) {
				console.log("err 2");
				return next(err);
			}

			//override the cleartext password with hashed one
			user.profile.password = hash
			console.log(user.profile.password);
			next();
		});
	});
});

User.methods.comparedPassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.profile.password, function(err, isMatch) {
		if (err) {
			return cb(err);
		}
		cb(null, isMatch);
	});
};

module.exports = User;
module.exports.set('toObject', { virtuals: true});
module.exports.set('toJSON', { virtuals: true});