const mongoose = require('mongoose');

const solutionSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  solution: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Solution', solutionSchema);
