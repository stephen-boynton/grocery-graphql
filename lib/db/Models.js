const { Schema, model } = require('mongoose');
const { promisifyAll } = require('bluebird');
const { map, pipe } = require('lodash/fp');

function createAndPromisifyModels(name) {
  return pipe(
    obj => new Schema(obj),
    schema => model(name, schema),
    promisifyAll
  )
}

exports.Groceries = createAndPromisifyModels('Groceries')({
  name: String,
  items: [String],
  current: Boolean,
  date_created: { type: Date, default: Date.now() }
});

exports.Meals = createAndPromisifyModels('Meals')({
  name: String,
  ingredients: [String],
  description: String,
  date_created: { type: Date, default: Date.now() },
  date_updated: { type: Date, default: Date.now() },
  favorite: { type: Boolean, default: false },
  tags: [String],
})