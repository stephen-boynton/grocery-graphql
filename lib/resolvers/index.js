const {
  Groceries, Meals, Tags, Plans, Users
} = require('../db/Models');
const { sign } = require('../util/jwt');
const logger = require('../util/logger');

async function createGrocery({ name, items, user }) {
  const grocery = new Groceries({
    name,
    owner: user.id,
    items
  });
  return grocery.save();
}

async function createMeals({
  name, items, tags, user
}) {
  try {
    const meal = new Meals({
      name,
      owner: user.id,
      items,
      tags
    });
    return meal.save().then(async (m) => {
      m.tags.map(async (tag) => {
        const existingTag = await Tags.findOne({ tag });
        if (existingTag) {
          await Tags.findByIdAndUpdate(existingTag.id, { $push: { meals: m.id } });
        } else {
          const newTag = new Tags({ tag, meals: [m.id] });
          await newTag.save();
        }
      });
      return m;
    });
  } catch (e) {
    logger.error(e);
    return {};
  }
}

async function createPlans({ name, meals, user }) {
  try {
    const plan = new Plans({
      name,
      owner: user.id,
      meals
    });
    return plan.save();
  } catch (e) {
    logger.error(e);
    return {};
  }
}

async function createUser({ name: uName, password, email: uEmail }) {
  try {
    const hashpass = Users.generateHash(password);
    const user = new Users({
      name: uName,
      password: hashpass,
      email: uEmail
    });
    const {
      name, email, plans, favorites, id
    } = await user.save();
    return {
      jwt: sign({
        name, email, plans, favorites, id
      })
    };
  } catch (e) {
    logger.error(e);
    return {};
  }
}

async function loginUser({ name: uName, password }) {
  try {
    const thisUser = await Users.findOne({ name: uName });
    const isValid = await Users.validatePassword(password, thisUser.password);
    if (isValid) {
      const {
        name, email, plans, favorites, id
      } = thisUser;
      return {
        jwt: sign({
          name, email, plans, favorites, id
        })
      };
    }
    return {};
  } catch (e) {
    logger.error(e);
    return {};
  }
}

module.exports = {
  Query: {
    async groceries(parent, args, { user }) {
      if (!user) return [];
      return Groceries.find({ $or: [{ owner: user }, { users: { $elemMatch: user } }] });
    },

    async grocery(parent, { key, value }) {
      return Groceries.findOne({ [key]: value });
    },

    async meals(parent, args, { user }) {
      if (!user) return [];
      return Meals.find({ $or: [{ owner: user }, { users: { $elemMatch: user } }] });
    },

    async meal(parent, { key, value }) {
      return Meals.findOne({ [key]: value });
    },

    async plans(parent, args, { user }) {
      if (!user) return [];
      return Plans.find({ $or: [{ owner: user }, { users: { $elemMatch: user } }] });
    },

    async plan(parent, { key, value }) {
      return Plans.findOne({ [key]: value });
    },

    async tags() {
      return Tags.find();
    },

    async tag(parent, { key, value }) {
      return Tags.findOne({ [key]: value }).populate('meals');
    },
  },

  Mutation: {
    async groceries(parent, args, { user }) {
      if (!user) return {};
      return createGrocery({ ...args, user });
    },

    async meals(parent, args, { user }) {
      if (!user) return {};
      return createMeals({ ...args, user });
    },

    async plans(parent, args, { user }) {
      if (!user) return {};
      return createPlans({ ...args, user });
    },

    async login(parent, args) {
      return loginUser(args);
    },

    async createUser(parent, args) {
      return createUser(args);
    }
  }
};
