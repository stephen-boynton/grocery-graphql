const mongoose = require('mongoose');
module.exports = mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true });
