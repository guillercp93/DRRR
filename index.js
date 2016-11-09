var express = require("express"),
	compression = require("compression"),
	bodyParser = require("body-parser"),
	cookieParser = require("cookie-parser"),
	favicon = require("serve-favicon"),
	path = require("path"),
	app = express();

app.set('port', process.env.PORT || 3000);
app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 4*60*60*1000 })); //available static files for 2h
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

app.listen(app.get('port'), function() {
	console.log('server listening on port %s', app.get('port'));
});

//import routes
require(path.join(__dirname, 'routes', 'routes'))(app);