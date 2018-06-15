// api routes
const router = require('express').Router();
const Factory = require('../models/Factory');
const randomNumber = require('../utils/randomNumber');

router.post('/api/factory', (req, res) => {
  let name = req.body.name;
  let children = createChildren(req.body.numChildren, req.body.lowerbound, req.body.upperbound);
  Factory.create({name: name, children: children})
    .then(factory => res.status(200).json(factory))
    .catch(err => console.log(err));
});

router.get('/api/factories', (req, res) => {
  Factory.findAll({})
    .then(factory => res.status(200).json(factory))
    .catch(err => console.log(err));
});

function createChildren(numChildren, lowerbound, upperbound) {
  console.log(numChildren, lowerbound, upperbound);
  let children = [];
  for(let i=1; i<numChildren+1; i++) {
    children.push(randomNumber(lowerbound, upperbound))
  }
  return children;
}

module.exports = router;