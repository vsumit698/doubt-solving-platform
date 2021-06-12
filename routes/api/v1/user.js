const router = require('express').Router();
const userController = require('../../../controllers/usersApi');

router.post('/register', userController.handleUserRegistration);
router.post('/login', userController.handleUserLogin);
router.get('/user-list', userController.getUsersList);

module.exports = router;