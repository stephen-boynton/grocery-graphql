const { AuthenticationError } = require('apollo-server-express');
const { sign } = require('../../util/jwt');


module.exports = async (parent, { input: { email, password } }, { db }) => {
  const users = await db.collection('users');

  const thisUser = await users.findOne({ email });

  if (!thisUser || thisUser.password !== password) {
    throw new AuthenticationError('Incorrect email or password.');
  }

  return {
    jwt: sign({
      user: thisUser._id
    })
  };
};
