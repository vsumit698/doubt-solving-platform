const router = require('express').Router();

router.get('/doubts-list');
router.post('/add-comment/:studentId');
router.post('/create-doubt/:studentId');
router.post('/:doubtId/ta-action/:taId');

module.exports = router;