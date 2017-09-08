const Router = require('koa-router')
const router = new Router()

router.post('/manage/*', function (ctx, next) {
  ctx.body = { data: [{id: 2}]};
})

module.exports = router;