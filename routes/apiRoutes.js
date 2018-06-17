// api routes
const router = require('express').Router();
const Factory = require('../models/Factory');
const randomNumber = require('../utils/randomNumber');
const sse = require('sse-express');
const app = require('express')();

module.exports = app => {

  router.post('/api/factory', (req, res) => {
    let name = req.body.name;
    let children = createChildren(req.body.numChildren, req.body.lowerbound, req.body.upperbound);
    console.log(children, name)
    Factory.create({name: name, children: children})
      .then(res => app.emit('message', {title: 'New message!'}))
      .catch(err  => console.log(err));    
  });
  
  router.delete('/api/factory/:id', (req, res) => {
    Factory.deleteOne({_id: req.params.id})
      .then(res => app.emit('message', {title: 'New message!'}))
      .catch(err  => console.log(err))
  });
  
  router.delete('/api/factories', (req, res) => {
    Factory.remove({})
      .then(res => app.emit('message', {title: 'New message!'}))
      .catch(err  => console.log(err))
  });
  
  router.put('/api/factory/:id', (req, res) => {
    Factory.findByIdAndUpdate(req.params.id, { name: req.body.newName })
    .then(res => app.emit('message', {title: 'New message!'}))
    .catch(err => console.log(err))
  });

  router.get('/api/factories', (req, res) => { 
    console.log();
    Factory.find({})
      .then(factory => res.status(200).json(factory))
      .catch(err => console.log(err));
  });

  return router;
}

function createChildren(numChildren, lowerbound, upperbound) {
    let children = [];
    for(let i=1; i<numChildren+1; i++) {
      children.push(randomNumber(lowerbound, upperbound))
    }
    return children;
  }

