// Api routes

// Dependencies
const router = require('express').Router();
const Factory = require('../models/Factory');
const randomNumber = require('../utils/randomNumber');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');


module.exports = app => {

  // Create a factory
  router.post('/api/factory', [
    body('name')
      .not().isEmpty()
      .trim()
      .escape(),
    body('numChildren')
      .isNumeric()
      .toInt(),
    body('lowerbound')
      .isNumeric()
      .toInt(),
    body('upperbound')
      .isNumeric()
      .toInt()
  ], (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array()})
    }

    // From name form field
    let name = req.body.name;
    
    // Pass numChildren, upperbound, and lowerbound to the createChildren
    // function to create specified amount of random numbers,
    // between specified 2 bounds
    let children = createChildren(req.body.numChildren, req.body.lowerbound, req.body.upperbound);
    
    // Insert name and random numbers into the database
    Factory.create({name: name, children: children})

      // Emit an event after the data has been entered
      .then(res => app.emit('message', {title: 'New message!'}))

      // Show errors on the console
      .catch(err  => console.log(err));    
  });
  
  // Delete 1 factory
  router.delete('/api/factory/:id', (req, res) => {

    // Remove factory with _id that matches id from the url
    Factory.deleteOne({_id: req.params.id})

      // Emit an event after the data has been entered
      .then(res => app.emit('message', {title: 'New message!'}))

      // Show errors on the console
      .catch(err  => console.log(err))
  });

  // Delete all factories
  router.delete('/api/factories', (req, res) => {

    // Remove every entry from the factories collection
    Factory.remove({})

      // Emit an event after the data has been entered
      .then(res => app.emit('message', {title: 'New message!'}))

      // Show errors on the console
      .catch(err  => console.log(err))
  });

  // Rename a factory
  router.put('/api/factory/:id', (req, res) => {

    // Replace name in the database, of the factory with _id that matches
    // id from the url, with name from the front end field
    Factory.findByIdAndUpdate(req.params.id, { name: req.body.newName })

    // Emit an event after the data has been entered
    .then(res => app.emit('message', {title: 'New message!'}))

    // Show errors on the console
    .catch(err => console.log(err))
  });

  // Retrieve all factories
  router.get('/api/factories', (req, res) => { 

    Factory.find({})

      // Display factories as json
      .then(factory => res.status(200).json(factory))

      // Show errors on the console
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

