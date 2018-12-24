const { Groceries, Meals, Tags, Plans, Users } = require('../db/Models');
const db = require('../db');
const { sign } = require('../util/jwt');

async function createGrocery({ name, items, user }) {
  const grocery = new Groceries({
    name,
    owner: user.id,
    items
  });
  return grocery.save();
}

async function createMeals({ name, items, tags, user }) {
  const meal = new Meals({
    name,
    owner: user.id,
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

async function createPlans({ name, meals, user }) {
  const plan = new Plans({
    name,
    owner: user.id,
    meals
  });
  return plan.save();
}

async function createUser({ name: uName, password, email }) {
  const hashpass = Users.generateHash(password);
  const user = new Users({
    name: uName,
    password: hashpass,
    email
  })
  const { name, email, plans, favorites, id } = await user.save();
  return {
    jwt: sign({ name, email, plans, favorites, id })
  };
}

async function loginUser({ name, password, user }) {
  const thisUser = await Users.findOne({ name });
  const isValid = await Users.validatePassword(password, thisUser.password);
  if (isValid) {
    const { name, email, plans, favorites, id } = thisUser;
    return {
      jwt: sign({ name, email, plans, favorites, id })
    };
  }
}

module.exports = {
  Query: {
    async groceries(parent, args, { user }, info) {
      if (!user) return [];
      return Groceries.find({ $or: [{ owner: user }, { users: { $elemMatch: user } }] });
    },

    async grocery(parent, { key, value }, ctx, info) {
      return Groceries.findOne({ [key]: value });
    },

    async meals(parent, args, { user }, info) {
      if (!user) return [];
      return Meals.find({ $or: [{ owner: user }, { users: { $elemMatch: user } }] });
    },

    async meal(parent, { key, value }, ctx, info) {
      return Meals.findOne({ [key]: value });
    },

    async plans(parent, args, { user }, info) {
      if (!user) return [];
      return Plans.find({ $or: [{ owner: user }, { users: { $elemMatch: user } }] });
    },

    async plan(parent, { key, value }, ctx, info) {
      return Plans.findOne({ [key]: value });
    },

    async tags(parent, args, ctx, info) {
      return Tags.find();
    },

    async tag(parent, { key, value }, ctx, info) {
      return Tags.findOne({ [key]: value }).populate('meals');
    },
  },

  Mutation: {
    async groceries(parent, args, { user }, info) {
      if (!user) return {};
      return createGrocery({ ...args, user });
    },

    async meals(parent, args, { user }, info) {
      if (!user) return {};
      return createMeals({ ...args, user });
    },

    async plans(parent, args, { user }, info) {
      if (!user) return {};
      return createPlans({ ...args, user });
    },

    async login(parent, args, ctx, info) {
      return loginUser(args);
    },

    async createUser(parent, args, ctx, info) {
      return createUser(args);
    }
  }
}