"use strict";

var path = require("path"),
    passport = require('passport'),
    LocalStrategy = require("passport-local").Strategy,
    httpStatus = require("http-status"),
    models = require(path.join('..', 'models', 'models'))();

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    models.User.findOne({_id: id}).exec(done);
});

passport.use(new LocalStrategy(function(username, password, done) {
    models.User.findOneAndUpdate(
        {'profile.username': username},
        {$set: {'profile.last_login_at': new Date()}}, 
        function(err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false, {message: "Incorrect username!"});
            }
            
            user.comparedPassword(password, done);
        });
}));

exports.login = passport.authenticate('local', {successRedirect: '/chat',
    failureRedirect: '/'});

exports.register = function(req, res) {
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
    user.save().then(function(doc) {
        if (doc.profile.username == req.body.username) {
            return res.status(httpStatus.OK).send("the new user is created successfull!");
        } else{
            return res.status(httpStatus.BAD_REQUEST).send("error in create new user");
        }
    }).catch(function(err) {
        console.log("enter to", err);
        if (err) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
        }
    });
};

exports.update = function(req, res) {
    console.log(req.params);
    models.User.update({'profile.username': req.params.username}, {
        'profile.email': req.body.email,
        'profile.name': req.body.name,
        'profile.lastname': req.body.lastname,
        'profile.picture': req.body.avatar,
        'profile.color': req.body.color,
        'profile.updated_at': new Date(),
    }).then(function(data) {
        console.log(data.nModified, data);
        if (data.nModified == 1) {
            return res.status(httpStatus.OK).send("user data updated!");
        }else{
            return res.sendStatus(httpStatus.BAD_REQUEST);
        }
    }).catch(function(err) {
        if (err) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
        }
    });
};

exports.check = function(req, res) {
    console.log('==>', req.params);
    models.User.findOne({ 'profile.username' : req.params.username }).then(function(data) {
        console.log('==>', data);
        res.json({ response: !data });
        res.end();
    }).catch(function(err) {
        if (err) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
        } 
    });
};