const { Groceries, Meals } = require('../db/Models');
const db = require('../db');

module.exports = {
  Query: {
    async groceries(parent, args, ctx, info) {
      return Groceries.findAsync();
    },

    async grocery(parent, { key, value }, ctx, info) {
      return Groceries.findOneAsync({ [key]: value });
    },

    async meals(parent, args, ctx, info) {
      return Meals.findAsync();
    }
  }
}