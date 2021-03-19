var express = require('express');
var router = express.Router();

let ctrl = require('../controllers/loginController');

router.route('/user')
    .get(ctrl.loginUser);

module.exports = router;