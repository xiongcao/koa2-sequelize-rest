const db = require('../db/db');

module.exports = db.defineModel('brand', {
  // 品牌名称
  name: db.STRING(100),
  // 品牌code
  code: db.STRING(100),
  // 产地
  location: db.STRING(100),
  // 关于品牌
  about: db.TEXT
});