"use strict";

var express = require("express"),
	compression = require("compression"),
	bodyParser = require("body-parser"),
	cookieParser = require("cookie-parser"),
    fs = require("fs"),
    methodOverride = require('method-override'),
    logger = require("morgan"),
	favicon = require("serve-favicon"),
	passport = require("passport"),
	path = require("path"),
	session = require("express-session"),
	app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(cookieParser("Baccano"));
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('combined', { stream : fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' }) }));
app.use(methodOverride('_method'));
app.use('/static', express.static(path.join(__dirname, 'public'), { maxAge: 4*60*60*1000, etag: false })); //available static files for 2h
app.use(session({ secret: 'baccano', resave: false, saveUninitialized: false, cookie : { secure: true } }));
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(passport.initialize());
app.use(passport.session());

app.listen(app.get('port'), function() {
	// console.log('server listening on port %s', app.get('port'));
	console.log(`server listening on port ${app.get('port')}`);
});

//import routes
app.use('/', require(path.join(__dirname, 'routes', 'routes')));

