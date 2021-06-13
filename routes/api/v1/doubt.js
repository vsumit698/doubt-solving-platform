const router = require('express').Router();
const doubtController = require('../../../controllers/doubtApi');
const passport = require('passport');


// below route is only accessible to user type -> student
router.post('/create-doubt/:studentId',passport.authenticate('jwt',{session:false}), doubtController.addDoubtHandler);

// below route is only accessible to user type -> student
router.post('/:doubtId/add-comment/:studentId', passport.authenticate('jwt',{session:false}), doubtController.addCommentHandler);

// below route is accessible to user type -> student, teacher, ta (teaching assistant)
router.get('/doubts-list', passport.authenticate('jwt',{session:false}), doubtController.getDoubtsList);

// below route is only accessible to user type -> ta (teaching assistant)
router.post('/:doubtId/:taAction/:taId',passport.authenticate('jwt',{session:false}), doubtController.taActionHandler);

// below route is only accessible to user type -> teacher
router.get('/teacher-dashboard',passport.authenticate('jwt',{session:false}), doubtController.getTeacherDashboardData);

module.exports = router;