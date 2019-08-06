const { path } = require('ramda');
const { v4 } = require('uuid');

module.exports = async (parent, args, { db }) => {
  const users = await db.collection('users');

  const newUser = {
    _id: v4(),
    name: 'stephen',
    email: 'test@test.com',
    password: '123',
    favorites: []
  };

  console.log(newUser);

  await users.deleteMany();
  const nU = await users.insertOne(newUser);

  console.log(nU);
  return path(['ops', 0], nU);
};
