const { MongoClient } = require('mongodb');
const logger = require('../util/logger');

async function connect() {
  try {
    const mongo = await MongoClient.connect(process.env.DATABASE_URI, { useNewUrlParser: true });
    logger.info('Connected to database');
    const db = mongo.db('test');
    return {
      db,
      mongo
    };
  } catch (e) {
    logger.error(e);
    throw e;
  }
}
module.exports = connect;
