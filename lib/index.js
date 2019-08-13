(() => (process.NODE_ENV === 'production' ? null : require('dotenv').config()))();

const app = require('express')();
const { ApolloServer } = require('apollo-server-express');
const Dataloader = require('dataloader');

const auth = require('./util/auth');
const connect = require('./db');
const getFavorites = require('./util/getFavorites');
const logger = require('./util/logger');
const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');

app.listen({ port: process.env.PORT || 4000 }, async () => {
  const { db, mongo } = await connect();
  const context = req => ({
    user: auth(req),
    db,
    mongo,
    favoritesLoader: new Dataloader(getFavorites(db))
  });

  const server = new ApolloServer({ typeDefs, resolvers, context });

  server.applyMiddleware({ app, path: '/data/' });
  logger.info(`🚀  Server ready at ${server.graphqlPath}`);
});

app.on('error', console.error);
