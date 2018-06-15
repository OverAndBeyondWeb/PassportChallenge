require('dotenv').config();

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const PORT = process.env.PORT || 3001;
const Factory = require('./models/Factory');

//set up promises with mongoose
mongoose.Promise = global.Promise;

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
