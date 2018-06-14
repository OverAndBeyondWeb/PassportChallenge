const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3001;

//db config
const db = require('./config/keys').MONGODB_URI;

//connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('connected to mongo'))
  .catch(err => console.log(err));

app.use(express.static(path.join(__dirname, 'client', 'build')));


app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
