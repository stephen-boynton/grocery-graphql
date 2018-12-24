const { get } = require('lodash/fp');
const { verify } = require('../util/jwt');

module.exports = ({ req }) => {
  const auth = get('headers.authentication', req);
  if (auth) {
    return { user: verify(auth) }
  }
  return { user: false }
}