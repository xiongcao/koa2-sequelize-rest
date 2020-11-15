const model = require('../db/model');

const { Product, Brand } = model;

Brand.hasMany(Product, {
  foreignKey: 'brandId',
  targetKey: 'id' // 默认id
});

module.exports = { 
  getBrands: async () => {
    return await Brand.findAll({
      include: [
        {
          model: Product, // 指定关联的model
        }
      ],
      raw: false // 开启原生查询，不需要转换成实例对象
    });
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