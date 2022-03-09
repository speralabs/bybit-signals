// import mongoose
const mongoose = require('mongoose');
// declare model name
const model_name = 'currency';
const uniqueValidator = require('mongoose-unique-validator');

// create schema
const schema = new mongoose.Schema(
  {
    rand_id: { type: Number, required: true },
    symbol: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

schema.plugin(uniqueValidator, {
  message: 'Error, expected {PATH} to be unique.',
});

// create modal
const model = mongoose.model(model_name, schema);
module.exports = model;
