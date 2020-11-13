const { parseUser } = require('./utils/tools')

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
          ctx.response.status = 500;
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
  },

  checkLoginStatus: () => {
    return async (ctx, next) => {
      ctx.isLogin = async () => {
        const sessionId = ctx.session.userId;
        if (!sessionId) {
          ctx.rest(null, -1, '未登录')
          return false;
        }
        return true
      };
      await next();
    }
  },
};