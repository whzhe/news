var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('wenyou/index', { title: 'Express', layout: "wenyou/layout" });
});

module.exports = router;
