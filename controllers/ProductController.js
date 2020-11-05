const ProductService = require('../service/ProductService');

const APIError = require('../rest').APIError;

module.exports = {
  'GET /products': async (ctx, next) => {
    ctx.rest(await ProductService.getProducts());
  },
  'POST /products': async (ctx, next) => {
    const p = await ProductService.createProduct(ctx.request.body);
    ctx.rest(p);
  },
  'DELETE /products/:id': async (ctx, next) => {
    const product = await ProductService.deleteProduct(ctx.params.id);
    if (product) {
      ctx.rest(product);
    } else {
      throw new APIError('product:not_found', 'product not found by id.');
    }
  }
};