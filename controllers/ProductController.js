const ProductService = require('../service/ProductService');

const { APIError, pageTable } = require('../rest');

module.exports = {
  'GET /api/product': async (ctx, next) => {
    let { page, size } = ctx.request.query;
    page = Number(page);
    size = Number(size);
    // 查询商品总数
    const count = await ProductService.getProductCount();
    const products = await ProductService.getProducts({ page, size });
    const data = pageTable(products, page, size, count);
    ctx.rest(data);
  },
  'POST /api/product': async (ctx, next) => {
    ctx.request.body.brandId = '5d0abdf9-161f-40bc-8dc8-00d1537589df';
    const p = await ProductService.createProduct(ctx.request.body);
    ctx.rest(p);
  },
  'DELETE /api/product/:id': async (ctx, next) => {
    const product = await ProductService.deleteProduct(ctx.params.id);
    if (product) {
      ctx.rest(product);
    } else {
      throw new APIError('product:not_found', 'product not found by id.');
    }
  }
};