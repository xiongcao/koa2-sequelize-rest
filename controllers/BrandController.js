const BrandService = require('../service/BrandService');

module.exports = {
  'GET /api/brands': async (ctx, next) => {
    ctx.rest(await BrandService.getBrands());
  },
  'GET /api/saveBrand': async (ctx, next) => {
    const data = {
      name: '牛乳石硷',
      code: 'cow',
      location: '日本',
      about: '不仅是一块香皂，更蕴含百年来的坚持与骄傲。为了全球消费者的笑容，致力于创造出舒适的生活风格，为人类的幸福生活作出贡献。'
    }
    const b = await BrandService.createBrand(data);
    ctx.rest(b);
  },
  'DELETE /api/brand/:id': async (ctx, next) => {
    const brand = await BrandService.deleteBrand(ctx.params.id);
    if (brand) {
      ctx.rest(brand);
    } else {
      ctx.rest(null, 1, '没有找到该品牌');
    }
  }
};