"use strict";

var path = require("path"),
    router = require("express").Router(),
    authController = require(path.join('..', 'controllers', 'authController'));

router.get('/', function(req, res, next) {
    res.render('index');
    next();
});

router.get('/partials/:filename', function(req, res, next) {
    var file = req.params.filename;
    console.log('========>', file);
    if (!file) {
        console.log("no filename");
        return;
    }
    res.render('partials/'+ file);
    next();
});

router.post('/auth/login/', authController.login);
router.post('/auth/create/', authController.register);
router.get('/auth/check/:username', authController.check);
router.put('/auth/update/:username', authController.update);

module.exports = router;