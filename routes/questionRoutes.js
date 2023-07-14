// questionRoutes.js

const express = require('express');
const router = express.Router();
const {
  addQuestion,
  editQuestion,
  deleteQuestion,
  addTestCase,
  submitSolution
} = require('../controllers/questionsController');
const {
  authenticateToken,
  isAdmin,
} = require('../middleware/authMiddleware');
const {
    signup,
    login

} = require('../controllers/authController');

// Signup
router.post('/signup', signup);

// Login
router.post('/login', login);

// Add a question
router.post('/questions', authenticateToken, isAdmin, addQuestion);

// Edit a question
router.put('/questions/:questionId', authenticateToken, isAdmin, editQuestion);

// Delete a question
router.delete('/questions/:questionId', authenticateToken, isAdmin, deleteQuestion);

// Add a test case to a question
router.post(
  '/questions/:questionId/testcases',
  authenticateToken,
  isAdmin,
  addTestCase
);

router.post(
    '/questions/:questionId/submit',
    authenticateToken,
    submitSolution
  );

module.exports = router;
