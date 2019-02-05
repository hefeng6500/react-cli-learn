import jwt from 'koa-jwt'
import config from '../config/environment'

let login = async ctx => {
  let username = ctx.request.body.username
  let password = ctx.request.body.password
  try {
    let results = await ctx.execSql(`SELECT * FROM user_list`);
    let userInfo
    await results.forEach((item, index) => {
      if (username === item.username && password === item.password) {
        userInfo = {
          userId: item.id,
          username: item.username
        }
      }
    })
    let payload = {
      exp:Date.now() + config.tokenExpiresTime,
      username: userInfo.userId,
    }
    // console.log(jwt)
    let token = jwt.sign(payload, config.jwtSecret,{ expiresIn: '2h' })
    ctx.response.body = {
      success: 1,
      message: '',
      userInfo: userInfo,
      token: token
    };
    
  }catch(error){
    console.log(error);
    ctx.response.body = {
      success: 0,
      message: '查询数据出错',
      posts: null
    };
  }
}

export {
  login
}