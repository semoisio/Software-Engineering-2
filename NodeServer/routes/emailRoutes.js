var express = require('express');
var router = express.Router();

var ctrl = require('../controllers/emailController')

router.route('/email/confirm')
    .put(ctrl.confirmEmail);

module.exports = router;