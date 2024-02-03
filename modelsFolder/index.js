const dbConfig = require('../config/db.config');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.uri = dbConfig.uri;

db.stores = require('./store')(mongoose); // 4 Properties

module.exports = db;
