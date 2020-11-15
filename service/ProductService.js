const model = require('../db/model');

const { Product } = model;

module.exports = { 
  getProducts: async ({ page = 0, size = 50, orderFileds = 'createdAt', orderRules = 'ASC' }) => {
    return await Product.findAll({
      limit: size,
      offset: page * size,
      order: [
        [orderFileds, orderRules]
      ]
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