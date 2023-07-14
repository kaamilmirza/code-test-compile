const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    difficulty: {
      type: String,
      required: true
    },
    testCases: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TestCase'
      }
    ]
  });
  

module.exports = mongoose.model('Question', questionSchema);
