// api routes
const router = require('express').Router();
const Factory = require('../models/Factory');
const randomNumber = require('../utils/randomNumber');
const sse = require('sse-express');
const app = require('express')();


router.get('/api/factories', (req, res) => {
  
  console.log();
  Factory.find({})
    .then(factory => res.status(200).json(factory))
    .catch(err => console.log(err));
});

function createChildren(numChildren, lowerbound, upperbound) {
  let children = [];
  for(let i=1; i<numChildren+1; i++) {
    children.push(randomNumber(lowerbound, upperbound))
  }
  return children;
}

module.exports = router;