const router = require('express').Router();

router.use('/api/v1',require('./v1/api-v1'));

module.exports = router;