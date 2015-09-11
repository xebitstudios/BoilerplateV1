var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var http = require('http');

var app = express();
// app.use(express.favicon());
// app.use(express.logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded());
// app.use(express.methodOverride());

var static = require('./lib/static.js').map;

var routes = require('./routes/index');
app.use('/', routes);
// app.get('/about', routes);
// app.get('/contact', routes);

var handlebars = require('express3-handlebars')
		.create({
    defaultLayout: 'main',
    helpers: {
        static: function (name) {
            return require('./lib/static.js').map(name);
        },
        section: function (name, options) {
            if (!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

// app.use('/', routes.index);
// app.get('/about', routes.about);
// app.get('/contact', routes.contact);

app.use(function (req, res, next) {
    res.status(404);
    res.render('404');
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});