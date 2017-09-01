const crypto = require('crypto');

function login(ctx) {
  const { userName = '', password = '' } = ctx.query;
  const session = ctx.session;
  ctx.session = null
  if (userName === '' || password === '') {
    return ctx.body = {
      "statusCode": 401,
      "error": "Unauthorized",
      "message": "用户名或密码不正确"
    }
  }
  const encodePsd = crypto.createHash("sha256").update(password).digest("hex")
  session.userName = userName;
  session.userId = 12345;
  ctx.body = encodePsd;
}
module.exports = {
  login,
}