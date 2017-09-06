const Router = require('koa-router')
const uuid = require('uuid/v1');


const router = new Router()
const reportRouter = require('./report')
const { login } = require('../controller/login')

router.post('/api/**', function (ctx, next) {
  if(!ctx.session.userId) { // 登录校验
    return ctx.status = 401;
  }
  next()
})

router.use('/api', reportRouter.routes())

router.post(/^\/api(?:\/|$)/, function (ctx, next) {
  ctx.status = 501;
})

router.get(/^\/api(?:\/|$)/, function (ctx, next) {
  ctx.status = 405;
})

router.get('/login', (ctx) => {
  ctx.body = 'login';
})

router.post('/login', login)

router.all('/logout', (ctx) => {
  ctx.session = null;
  ctx.redirect('/login');
})

router.all('*.*', function (ctx, next) {
  ctx.status = 404;
});

router.get('*', function (ctx, next) {
  if(!ctx.session.userId) {
    return ctx.redirect('/login');
  }
  ctx.body = 'Hello 1';
});

module.exports = router