const { AuthenticationError } = require('apollo-server-express');

module.exports = async (parent, args, { db, user }) => {
  if (!user) throw new AuthenticationError('must be logged in to create meal');
  const meals = await db.collection('meals');

  return meals.find({ owner: user }).sort({ last_date_used: -1 }).limit(4).toArray();
};
