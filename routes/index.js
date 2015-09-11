var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('home', { layout: 'main' });
});

router.get('/about', function (req, res) {
    res.render('about', { layout: 'main' });
});

router.get('/contact', function (req, res) {
    res.render('contact', { layout: 'main' });
});

module.exports = router;