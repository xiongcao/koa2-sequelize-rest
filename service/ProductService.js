const model = require('../db/model');

const { Product, Brand, DB } = model;

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
      raw: true // 开启原生查询，不需要转换成实例对象
    });
  },
  getProductCount: async () => {
    return await Product.count();
  },
  getProductAndBrandAll: async () => {
    const sql = `SELECT p.id as pid, p.name as pname, p.price, b.id as bid, b.name as bname FROM product AS p LEFT JOIN brand AS b ON b.id = p.brand_id`;
    return await DB.query(sql, { type: DB.QueryTypes.SELECT });
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