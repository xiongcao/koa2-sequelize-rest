const model = require('../db/model');

const { Product } = model;

module.exports = { 
  getProducts: async () => {
    return await Product.findAll();
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