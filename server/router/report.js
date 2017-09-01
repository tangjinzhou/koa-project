const Router = require('koa-router')
const router = new Router()

router.post('/report/*', function (ctx, next) {
  ctx.body = { data: [{id: 1}]};
})

module.exports = router;
