const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const test = require('./test/test');

// Create Express app
const app = express();

// Parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
//testing sphere engine api connection
test();
// Routes
const questionRoutes = require('./routes/questionRoutes');
app.use('/api', questionRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
