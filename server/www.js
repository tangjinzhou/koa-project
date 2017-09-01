const Koa = require('koa')
const Boom = require('boom')
const path = require('path')
const staticCache = require('koa-static-cache')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const router = require('./router/index')
const config = require('./config')

const app = new Koa()

app.keys = ['2017yidian', 'yidian2017']

app.use(staticCache(path.join(__dirname, 'public'), {
  maxAge: 365 * 24 * 60 * 60,
  gzip: true,
  dynamic: true,
}))

// redis多进程共享session
app.use(session({
  store: redisStore(config.redisConfig),
  key: config.sessionKey,
  prefix: 'user_session',
}))

app.use(router.routes())

app.use(router.allowedMethods({
  throw: false,
  notImplemented: () => new Boom.notImplemented(),
  methodNotAllowed: () => new Boom.methodNotAllowed('that method is not allowed')
}))

app.on('error', function(err, ctx){
  console.error('server error', err)
})

app.listen(3000)