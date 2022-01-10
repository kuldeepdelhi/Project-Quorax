const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController')
const questionController = require('../controllers/questionController')
const answerController = require('../controllers/answerController')

const midvarify = require('../middleware/verify')

// router.post('/write-file-aws', awsController.createProfilePicture)
router.post('/register', userController.registerUser)
router.post('/login', userController.login)
router.get('/user/:userId/profile', midvarify.varifyUser, userController.getUser)
router.put('/user/:userId/profile',midvarify.varifyUser, userController.updateUserDetailes)

router.post('/question' ,midvarify.varifyUser,  questionController.postquestion);
router.get('/question', questionController.getquestion);
router.get('/questions/:questionId', questionController.getquestionbyid);
router.put('/question/:questionId',midvarify.varifyUser,questionController.updatequestionbyid);
router.delete('/question/:questionId',midvarify.varifyUser,questionController.deletequestionbyid);//router.put('/questions/:questionId' ,midvarify.varifyUser, questionController.updateQuestion);

router.post('/answer',midvarify.varifyUser,answerController.postanswer);
router.get('/questions/:questionId/answer',answerController.getanswer);
router.put('/answer/:answerId',midvarify.varifyUser,answerController.updateanswer);
router.delete('/answer/:answerId',midvarify.varifyUser,answerController.deleteanswer);


module.exports = router;