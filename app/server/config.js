const sessionKey = 'crm:sess'
const config = {
    development: {
        env: 'development',
        port: '3000',
        redisConfig: {
            // host: process.env.RS_PORT_6379_TCP_ADDR || '127.0.0.1',
            // host: '127.0.0.1',
            // port: '6379',
            sentinels: [
                { host: process.env.RS1_PORT_6379_TCP_ADDR, port: 26379 },
                { host: process.env.RS2_PORT_6379_TCP_ADDR, port: 26379 },
                { host: process.env.RS3_PORT_6379_TCP_ADDR, port: 26379 },
            ],
            name: 'redismaster'
        },
        sessionKey,
    },
    test: {
        env: 'test',
        port: '8371',
        redisConfig: {
            host: '127.0.0.1',
            port: '6379',
        },
        sessionKey,
    },
    production: {
        env: 'production',
        port: '8372',
        redisConfig: {
            host: '127.0.0.1',
            port: '6379',
        },
        sessionKey,
    },
}
module.exports = config[process.env.NODE_ENV || 'development'];