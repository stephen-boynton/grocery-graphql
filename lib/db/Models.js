const { Schema, model } = require('mongoose');
const { pipe } = require('lodash/fp');

function createModels(name) {
  return pipe(
    obj => new Schema(obj),
    schema => model(name, schema)
  )
}

exports.Groceries = createModels('Groceries')({
  name: String,
  items: [String],
  date_created: { type: Date, default: Date.now() },
  date_updated: { type: Date, default: Date.now() }
});

exports.Meals = createModels('Meals')({
  name: String,
  ingredients: [String],
  description: String,
  date_created: { type: Date, default: Date.now() },
  date_updated: { type: Date, default: Date.now() },
  favorite: { type: Boolean, default: false },
  tags: { type: [String], default: [] },
});

exports.Tags = createModels('Tags')({
  tag: String,
  meals: [{ type: Schema.Types.ObjectId, ref: 'Meals' }],
  date_created: { type: Date, default: Date.now() },
  date_updated: { type: Date, default: Date.now() }
});

exports.Plans = createModels('Plans')({
  name: String,
  meals: [{ type: Schema.Types.ObjectId, ref: 'Meals' }],
  date_created: { type: Date, default: Date.now() },
  date_updated: { type: Date, default: Date.now() }
});
