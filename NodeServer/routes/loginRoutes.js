var express = require('express');
var router = express.Router();

let ctrl = require('../controllers/loginController');

router.route('/login')
    .get(ctrl.loginUser);

module.exports = router;