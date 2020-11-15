const model = require('../db/model');

const { Brand } = model;

module.exports = { 
  getBrands: async () => {
    return await Brand.findAll();
  },
  getBrand: async (id) => {
    return await Brand.findAll({
      where: { id }
    });
  },
  createBrand: async (brand) => {
    return await Brand.create(brand);
  },
  deleteBrand: async (id) => {
    return await Brand.destroy({ where: { id }});
  }
}