const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2'); // Import the pagination plugin

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  testCases: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TestCase',
    },
  ],
});

questionSchema.plugin(mongoosePaginate); // Apply the pagination plugin to the question schema

module.exports = mongoose.model('Question', questionSchema);