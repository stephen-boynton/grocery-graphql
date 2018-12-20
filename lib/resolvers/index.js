const { Groceries, Meals, Tags, Plans } = require('../db/Models');
const db = require('../db');

async function createGrocery({ name, items }) {
  const grocery = new Groceries({
    name,
    items
  });
  return grocery.save();
}

async function createMeals({ name, items, tags }) {
  const meal = new Meals({
    name,
    items,
    tags
  });
  return meal.save().then(async m => {
    m.tags.map(async tag => {
      const existingTag = await Tags.findOne({ tag });
      if (existingTag) {
        await Tags.findByIdAndUpdate(existingTag.id, { $push: { meals: m.id } })
      } else {
        const newTag = new Tags({ tag, meals: [m.id] })
        await newTag.save();
      }
    })
    return m;
  });
}

async function createPlans({ name, meals }) {
  const plan = new Plan({
    name,
    meals
  });
  return plan.save();
}

module.exports = {
  Query: {
    async groceries(parent, args, ctx, info) {
      return Groceries.find();
    },

    async grocery(parent, { key, value }, ctx, info) {
      return Groceries.findOne({ [key]: value });
    },

    async meals(parent, args, ctx, info) {
      return Meals.find();
    },

    async meal(parent, { key, value }, ctx, info) {
      return Meals.findOne({ [key]: value });
    },

    async plans(parent, args, ctx, info) {
      return PLans.find();
    },

    async plan(parent, { key, value }, ctx, info) {
      return PLans.findOne({ [key]: value });
    },

    async tags(parent, args, ctx, info) {
      return Tags.find();
    },

    async tag(parent, { key, value }, ctx, info) {
      return Tags.findOne({ [key]: value }).populate('meals');
    },
  },

  Mutation: {
    async groceries(parent, args, ctx, info) {
      return createGrocery(args);
    },

    async meals(parent, args, ctx, info) {
      return createMeals(args);
    },

    async plans(parent, args, ctx, info) {
      return createPlans(args);
    }
  }
}