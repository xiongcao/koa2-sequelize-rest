const fs = require('fs');
const api = '/api'

function addMapping(router, mapping) {
  for (let url in mapping) {
    if (url.startsWith('GET ')) {
      let path = url.substring(4);
      if (path !== '/' && path !== '/swagger') {
        path = api + path
      }
      router.get(path, mapping[url]);
    } else if (url.startsWith('POST ')) {
      let path = api + url.substring(5);
      router.post(path, mapping[url]);
    } else if (url.startsWith('PUT ')) {
      let path = api + url.substring(4);
      router.put(path, mapping[url]);
    } else if (url.startsWith('DELETE ')) {
      let path = api + url.substring(7);
      router.del(path, mapping[url]);
    } else {
      console.log(`invalid URL: ${api + url}`);
    }
  }
}

function addControllers(router, dir) {
  fs.readdirSync(__dirname + '/' + dir).filter((f) => {
    return f.endsWith('.js');
  }).forEach((f) => {
    let mapping = require(__dirname + '/' + dir + '/' + f);
    addMapping(router, mapping);
  });
}

module.exports = function (dir) {
  let
    controllers_dir = dir || 'controllers',
    router = require('koa-router')();
  addControllers(router, controllers_dir);
  return router.routes();
};