(() => (process.NODE_ENV === 'production' ? null : require('dotenv').config()))();

const app = require('express')();
const { ApolloServer } = require('apollo-server-express');
const connect = require('./db');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const auth = require('./util/auth');
const logger = require('./util/logger');

app.listen({ port: process.env.PORT || 4000 }, async () => {
  const db = await connect();
  const context = req => ({
    user: auth(req),
    db
  });

  const server = new ApolloServer({ typeDefs, resolvers, context });

  server.applyMiddleware({ app, path: '/data/' });
  logger.info(`🚀  Server ready at ${server.graphqlPath}`);
});

app.on('error', console.error);
