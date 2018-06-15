require('dotenv').config();

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const randomNumber = require('./utils/randomNumber');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const PORT = process.env.PORT || 3001;
const Factory = require('./models/Factory');

//set up promises with mongoose
mongoose.Promise = global.Promise;

//db config
const db = require('./config/keys').MONGODB_URI || process.env.MONGOLAB_URI;

//connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('connected to mongo'))
  .catch(err => console.log(err));

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

app.post('/api/factory', (req, res) => {
  let name = req.body.name;
  let children = createChildren(req.body.numChildren, req.body.lowerbound, req.body.upperbound);
  console.log(children, name)
  Factory.create({name: name, children: children})
    .then(res => app.emit('message', {title: 'New message!'}))
    .catch(err  => console.log(err));    
});

app.delete('/api/factory/:id', (req, res) => {
  Factory.deleteOne({_id: req.params.id})
    .then(res => app.emit('message', {title: 'New message!'}))
    .catch(err  => console.log(err))
});

app.delete('/api/factories', (req, res) => {
  Factory.remove({})
    .then(res => app.emit('message', {title: 'New message!'}))
    .catch(err  => console.log(err))
});

app.put('/api/factory/:id', (req, res) => {
  Factory.findByIdAndUpdate(req.params.id, { name: req.body.newName })
  .then(res => app.emit('message', {title: 'New message!'}))
  .catch(err => console.log(err))
});

app.use(require('./routes/apiRoutes'));

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});



function createChildren(numChildren, lowerbound, upperbound) {
  let children = [];
  for(let i=1; i<numChildren+1; i++) {
    children.push(randomNumber(lowerbound, upperbound))
  }
  return children;
}