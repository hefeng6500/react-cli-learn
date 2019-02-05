import Koa from 'koa'
import Router from 'koa-router'
import jwt from 'koa-jwt'
import bodyParser from 'koa-bodyparser'
import cors from 'koa2-cors'

import config from './config/environment'
import { getCode,login } from './api/login.js'
import query from './utils/mysql-async'
import tokenVaild from './middleware/tokenValid.js'
import session from './middleware/session.js'


const app = new Koa()
const router = new Router();
const main = async ctx => {
  ctx.response.body = 'Hello World!'
}
app.use(session())
app.use(tokenVaild());
app.use(async (ctx, next) => {
  ctx.execSql = query;
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
  ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, Authorization, origin, content-type");
  ctx.set("Content-Type", "application/json;charset=utf-8");
  ctx.set("Access-Control-Allow-Credentials", true);
  ctx.set("Access-Control-Max-Age", 300);
  ctx.set("Access-Control-Expose-Headers", "myData");
  await next();
});

router.get('/', main);
router.get('/api/getCode', getCode)
router.post('/api/login', login);
app.listen(config.port)

app.use(jwt({
  secret: config.tokenSecret
}).unless({
  path: [
    /^\/api\/login/,
    /^\/api\/getCode/,
  ]
}));

app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods());

console.log(`Server is running at port ${config.port}`)
console.log(`open http://localhost:${config.port}`)