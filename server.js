// Access environment variables
require('dotenv').config();

// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// Initialize app
const app = express();

// Default port
const PORT = process.env.PORT || 3001;

// Parse request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Set up promises with mongoose
mongoose.Promise = global.Promise;

// Database config
const db = require('./config/keys').MONGODB_URI || process.env.MONGOLAB_URI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('connected to mongo'))
  .catch(err => console.log(err));

// Serve static files
app.use(express.static(path.join(__dirname, 'client', 'build')));


app.get('/eventstream', (req, res, next) => {
  res.set({
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
  });
  app.on('message', data => {
      res.write(`event: message\n`);
      res.write(`data: ${JSON.stringify(data)}\n\n`);
  });
});

// Use router instance
app.use(require('./routes/apiRoutes')(app));

// Listen for connections
app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
