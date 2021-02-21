var express = require('express');
var router = express.Router();

let ctrl = require('../controllers/userController');

router.route('/user')
    //.get(ctrl.findOneUser)
    .post(ctrl.createNewUser)
    .get(ctrl.loginUser);

module.exports = router;
