const db = require('../db/db');

module.exports = db.defineModel('product', {
  // ownerId: db.ID,
  name: db.STRING(100),
  price: db.BIGINT,
  manufacturer: db.STRING(100),
});