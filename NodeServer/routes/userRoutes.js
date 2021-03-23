var express = require('express');
var router = express.Router();

let ctrl = require('../controllers/userController');

router.route('/user')
    //.get(ctrl.findOneUser)
    .post(ctrl.createNewUser)
    //.get(ctrl.loginUser);
    .get(ctrl.findUser)
    .put(ctrl.updateUser)

router.route('/user/:id')
    .delete(ctrl.deleteUser)

module.exports = router;
