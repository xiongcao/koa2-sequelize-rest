const db = require('../db/db');

module.exports = db.defineModel('product', {
  name: db.STRING(100),
  price: db.BIGINT,
  manufacturer: db.STRING(100),
});