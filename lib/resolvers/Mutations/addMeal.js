const { AuthenticationError } = require('apollo-server-express');
const { path } = require('ramda');
const { v4 } = require('uuid');

module.exports = async (parent, { input: { meal } }, { db, user }) => {
  if (!user) throw new AuthenticationError('must be logged in to create meal');
  const meals = await db.collection('meals');
  await meals.deleteMany();
  const newMeal = {
    _id: v4(),
    ...meal,
    owner: user,
    date_created: new Date(),
    date_updated: new Date()
  };

  const done = await meals.insertOne(newMeal);
  return path(['ops', 0], done);
};
