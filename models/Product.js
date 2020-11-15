const db = require('../db/db');

module.exports = db.defineModel('product', {
  // 商品名称
  name: db.STRING(100),
  // 商品价格
  price: db.BIGINT,
  // 商品介绍
  manufacturer: db.STRING(100),
  // 品牌ID
  brandId: {
    type: db.STRING(50),
    allowNull: false,
    field: 'brand_id'
  }
});