"use strict";

var express = require("express"),
	compression = require("compression"),
	bodyParser = require("body-parser"),
	cookieParser = require("cookie-parser"),
	favicon = require("serve-favicon"),
	passport = require("passport"),
	path = require("path"),
	session = require("express-session"),
	app = express();

app.set('port', process.env.PORT || 3000);
app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(cookieParser("Baccano"));
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 4*60*60*1000 })); //available static files for 2h
app.use(session({secret: 'baccano'}));
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(passport.initialize());
app.use(passport.session());

app.listen(app.get('port'), function() {
	console.log('server listening on port %s', app.get('port'));
});

//import routes
app.use('/', require(path.join(__dirname, 'routes', 'routes')));

