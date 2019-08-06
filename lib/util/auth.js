const {
  pipe, path, prop, tap
} = require('ramda');
const { verify } = require('./jwt');

module.exports = pipe(
  path(['req', 'headers', 'authentication']),
  verify,
  prop('user'),
);
