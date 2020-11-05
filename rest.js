module.exports = {
  APIError: function (code, message) {
    this.code = code || 'internal:unknown_error';
    this.message = message || '';
  },
  restify: (pathPrefix) => {
    pathPrefix = pathPrefix || '/api/';
    return async (ctx, next) => {
      if (ctx.request.path.startsWith(pathPrefix)) {
        ctx.rest = (data = null, code = 0, msg = null) => {
          ctx.response.type = 'application/json';
          ctx.response.body = {
            code, msg, data
          };
        }
        try {
          await next();
        } catch (e) {
          ctx.response.status = 400;
          ctx.response.type = 'application/json';
          ctx.response.body = {
            code: e.code || 'internal:unknown_error',
            message: e.message || ''
          };
        }
      } else {
        await next();
      }
    };
  }
};