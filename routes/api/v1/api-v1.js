const router = require('express').Router();

router.use('/doubt',require('./doubt'));
router.use('/user',require('./user'));

module.exports = router;