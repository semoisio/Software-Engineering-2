var express = require('express');
var router = express.Router();

let ctrl = require('../controllers/emailResetController');

router.route('/emailReset')
    .get(ctrl.checkToken)
    .put(ctrl.emailReset);
    

module.exports = router;








