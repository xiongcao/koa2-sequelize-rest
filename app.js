const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

const templating = require('./templating');

const rest = require('./rest');

const app = new Koa();


// log request URL:
app.use(async (ctx, next) => {
  await next();
});

// static file support:
let staticFiles = require('./static-files');
app.use(staticFiles('/static/', __dirname + '/static'));
app.use(staticFiles('/public/', __dirname + '/public'));

// parse request body:
app.use(bodyParser({ enableTypes: ['json', 'form', 'text'] }));

// add nunjucks as view:
app.use(templating('views', {
  noCache: true,
  watch: true
}));

app.use(templating('public', {
  noCache: true,
  watch: true
}));

// bind .rest() for ctx:
app.use(rest.restify());

// add controllers:
app.use(controller());

// const router = require('koa-router')();
// const mime = require('mime');
// const fs = require('mz/fs');

// router.get('/swagger', async (ctx, next) => {
//   let rpath = ctx.request.path;
//   ctx.response.type = mime.getType(__dirname + '/public/index.html');
//   ctx.response.body = await fs.readFile(__dirname + '/public/index.html');
//   await next();
// });

// app.use(router.routes());

app.listen(3000);
console.log('app started at port 3000...');