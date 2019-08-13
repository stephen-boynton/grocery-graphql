const { AuthenticationError } = require('apollo-server-express');

module.exports = async (parent, args, { db, user, favoritesLoader }) => {
  if (!user) throw new AuthenticationError('must be logged in');
  return favoritesLoader.load(parent);
};
