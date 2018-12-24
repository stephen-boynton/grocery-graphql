const mongoose = require('mongoose');
const logger = require('../util/logger');

function connect() {
  try {
    mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true });
    logger.info('Connected to database');
  } catch (e) {
    logger.error(e);
  }
}
module.exports = connect();
