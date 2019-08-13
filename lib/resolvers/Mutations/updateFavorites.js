const { AuthenticationError } = require('apollo-server-express');
const { uniq } = require('ramda');

module.exports = async (parent, { input: { isfav, id } }, { mongo, db, user }) => {
  if (!user) throw new AuthenticationError('must be logged in to create meal');
  const session = mongo.startSession();
  session.startTransaction();
  const users = db.collection('users');

  try {
    const resolvedUser = await users.findOne({ _id: user });

    const newFavorites = isfav
      ? uniq([...resolvedUser.favorites, id])
      : resolvedUser.favorites.filter(i => i !== id);

    const updated = await users.findOneAndUpdate(
      {
        _id: user
      },
      {
        $set: {
          favorites: newFavorites
        }
      },
      {
        returnOriginal: false,
        projection: { password: 0 }
      }
    );

    await session.commitTransaction();
    session.endSession();

    return updated.value;
  } catch (e) {
    throw new Error(e.message);
  }
};
