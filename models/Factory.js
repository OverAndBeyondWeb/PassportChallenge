// Reference mongoose library
const mongoose = require('mongoose');

// Schema Object
const Schema = mongoose.Schema;

// Define factory schema
const FactorySchema = new Schema({
  name: {
    type: String
  },
  children: [{
    type: Number,
    required: true
  }]
});

// Create model from schema
const Factory = mongoose.model('Factory', FactorySchema);

// Export model
module.exports = Factory;
