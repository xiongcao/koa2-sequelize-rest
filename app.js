const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

const templating = require('./templating');

const rest = require('./rest');

const { parseUser } = require('./utils/tools')

const app = new Koa();


// parse user from cookie:
app.use(async (ctx, next) => {
  ctx.state.user = parseUser(ctx.cookies.get('name') || '');
  await next();
});

// static file support:
let staticFiles = require('./static-files');
app.use(staticFiles('/public/', __dirname + '/public'));
app.use(staticFiles('/static/', __dirname + '/static'));

// parse request body:
app.use(bodyParser({ enableTypes: ['json', 'form', 'text'] }));

// add nunjucks as view:
app.use(templating('views', {
  noCache: true,
  watch: true
}));

// 使用swagger
// app.use(templating('public', {
//   noCache: true,
//   watch: true
// }));

// bind .rest() for ctx:
app.use(rest.restify());

// add controllers:
app.use(controller());


app.listen(3000);
console.log('app started at port 3000...');