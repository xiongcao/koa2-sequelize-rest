const model = require('../db/model');

const { Product, Brand } = model;

Product.belongsTo(Brand, {
  foreignKey: 'brandId',
  targetKey: 'id' // 默认id
});

module.exports = { 
  getProducts: async ({ page = 0, size = 50, orderFileds = 'createdAt', orderRules = 'ASC' }) => {
    return await Product.findAll({
      limit: size,
      offset: page * size,
      order: [
        [orderFileds, orderRules]
      ],
      include: [
        {
          model: Brand, // 指定关联的model
          attributes: [
            ['name', 'brandName'], // 查询的关联表的字段以及字段别名
            ['code', 'brandCoe']
          ]
        }
      ],
      raw: false // 开启原生查询，原生查询支持的功能更多，自定义更强
    });
  },
  getProductCount: async () => {
    return await Product.count();
  },
  getProduct: async (id) => {
    return await Product.findAll({
      where: { id }
    });
  },
  createProduct: async (product) => {
    return await Product.create(product);
  },
  deleteProduct: async (id) => {
    return await Product.destroy({ where: { id }});
  }
}