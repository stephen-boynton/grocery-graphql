require('./db');
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const context = require('./auth');
const logger = require('./util/logger');

const server = new ApolloServer({ typeDefs, resolvers, context });

server.listen().then(({ url }) => {
  logger.info(`🚀  Server ready at ${url}`);
});
