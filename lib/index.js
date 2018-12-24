require('./db');
const app = require('express')();
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const context = require('./auth');
const logger = require('./util/logger');

const server = new ApolloServer({ typeDefs, resolvers, context });

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: process.env.PORT || 4000 }, () => {
  logger.info(`🚀  Server ready at ${server.graphqlPath}`);
});
