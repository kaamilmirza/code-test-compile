const mongoose = require('mongoose');

const testCaseSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  input: {
    type: String,
  },
  output: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('TestCase', testCaseSchema);
