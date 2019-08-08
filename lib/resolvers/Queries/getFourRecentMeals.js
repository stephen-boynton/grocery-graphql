const { AuthenticationError } = require('apollo-server-express');
const { path } = require('ramda');

module.exports = async (parent, { input: { user } }, { db, user }) => {
    if (!user) throw new AuthenticationError('must be logged in to create meal');
    const meals = await db.collection('meals');

    const done = await meals.find({ owner: user }).sort({ last_date_used: 1 }).limit(4).toArray();
    return done;
};
