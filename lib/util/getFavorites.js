const { path } = require('ramda');

module.exports = db => async (arrayOfParents) => {
  const meals = db.collection('meals');
  const favoritesIds = path([0, 'favorites'], arrayOfParents);
  const search = favoritesIds.map(fav => ({ _id: fav }));
  const results = await meals.find({ $or: search }).toArray();
  return favoritesIds.map(id => results.filter(({ _id }) => _id === id));
};
