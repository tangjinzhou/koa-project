const Router = require('koa-router')
const uuid = require('uuid/v1');


const router = new Router()
const reportRouter = require('./report')
const manageRouter = require('./manage')
const { login } = require('../controller/login')

router.post('/api/**', function (ctx, next) {
  if(!ctx.session.userId) { // 登录校验
    return ctx.status = 401;
  }
  next()
})

router.use('/api', reportRouter.routes())
router.use('/api', manageRouter.routes())

router.post(/^\/api(?:\/|$)/, function (ctx, next) {
  ctx.status = 501;
})

router.get(/^\/api(?:\/|$)/, function (ctx, next) {
  ctx.status = 405;
})

router.get('/login', async function (ctx) {
  await ctx.render('index')
})

router.post('/login', login)

router.all('/logout', (ctx) => {
  ctx.session = null;
  ctx.redirect('/login');
})

router.all('*.*', function (ctx, next) {
  ctx.status = 404;
});

router.get('*', async function (ctx, next) {
  if(!ctx.session.userId) {
    return ctx.redirect('/login');
  }
  await ctx.render('index')
});

module.exports = router