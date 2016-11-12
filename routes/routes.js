"use strict";

var path = require("path"),
    router = require("express").Router(),
    authController = require(path.join('..', 'controllers', 'authController'));

router.get('/', function(req, res, next) {
    res.render('index');
    next();
});

router.post('/auth/login/', authController.login);
router.put('/auth/create/', authController.register);
router.put('/auth/update/:username', authController.update);

module.exports = router;