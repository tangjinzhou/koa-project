const sessionPrefix = 'crm:sess'
const config = {
  development: {
    env: 'development',
    port: '3000',
    redisConfig: {
      host: '127.0.0.1',
      port: '6379',
    },
    sessionPrefix,
  },
  test: {
    env: 'test',
    port: '8371',
    redisConfig: {
      host: '127.0.0.1',
      port: '6379',
    },
    sessionPrefix,
  },
  production: {
    env: 'production',
    port: '8372',
    redisConfig: {
      host: '127.0.0.1',
      port: '6379',
    },
    sessionPrefix,
  },
}
module.exports = config[process.env.NODE_ENV || 'development'];