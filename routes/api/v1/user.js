const router = require('express').Router();
const userController = require('../../../controllers/usersApi');
const passport = require('passport');

router.post('/register', userController.handleUserRegistration);
router.post('/login', userController.handleUserLogin);
router.get('/user-list', passport.authenticate('jwt',{session:false}), userController.getUsersList);

module.exports = router;