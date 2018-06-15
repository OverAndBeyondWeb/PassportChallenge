//reference mongoose library
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FactorySchema = new Schema({
  name: {
    type: String
  },
  children: [{
    type: Number,
    required: true
  }]
});

const Factory = mongoose.model('Factory', FactorySchema);

module.exports = Factory;
