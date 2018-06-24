var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const query = require('../database/queries')

/* ---------------- Users Api ----------------- */
router.get('/api/users', query.getAllUsers);
router.get('/api/users/:id', query.getSingleUser);
router.post('/api/users', query.createUser);
router.put('/api/users/:id', query.updateUser);
router.delete('/api/users/:id', query.removeUser);

/* ---------------- Questions Api ----------------- */
router.get('/api/questions', query.getAllQuestions);
router.get('/api/questions/:id', query.getSingleQuestion);
router.post('/api/questions', query.createQuestion);
router.put('/api/questions/:id', query.updateQuestion);
router.delete('/api/questions/:id', query.removeQuestion);

/* ---------------- Trivias Api ----------------- */
router.get('/api/trivias', query.getAllTrivias);
router.get('/api/trivias/:id', query.getSingleTrivia);
router.post('/api/trivias', query.createTrivia);
router.put('/api/trivias/:id', query.updateTrivia);
router.delete('/api/trivias/:id', query.removeTrivia);

/* ---------------- Question Trivias Api ----------------- */
router.get('/api/questionTrivias', query.getAllQuestionTrivias);
router.get('/api/questionTrivias/:id_trivia/:id_question', query.getSingleQuestionTrivia);
router.post('/api/questionTrivias/:id_trivia/:id_question', query.createQuestionTrivia);
router.delete('/api/questionTrivias/:/:id_trivia/:id_question', query.removeQuestionTrivia);

/* ---------------- User Trivias Api ----------------- */
router.get('/api/userTrivias', query.getAllUserTrivias);
router.get('/api/userTrivias/:id_trivia/:id_user', query.getSingleUserTrivia);
router.post('/api/userTrivias', query.createUserTrivia);
router.put('/api/userTrivias/:id_trivia/:id_user', query.updateUserTrivia);
router.delete('/api/userTrivias/:/:id_trivia/:id_question', query.removeUserTrivia);

module.exports = router;
