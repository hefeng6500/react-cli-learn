import jwt from 'jsonwebtoken'
import svgCaptcha from 'svg-captcha'

import config from '../config/environment'

let getCode = async ctx => {
  let codeInfo = svgCaptcha.create({
    size: 4, // 验证码长度
    ignoreChars: '012iIlLoOzZ', // 验证码字符中排除 
    noise: 3, // 干扰线条的数量
    color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
    background: '#d8e3e7', // 验证码图片背景颜色
  });
  ctx.response.body = {
    success: 1,
    message: '',
    data: {
      data: codeInfo.data,
      text: codeInfo.text
    }
  }
}

let login = async ctx => {
  let username = ctx.request.body.username
  let password = ctx.request.body.password
  try {
    let results = await ctx.execSql(`SELECT * FROM user_list WHERE username=\'${username}\' AND password=\'${password}\'`);
    let userInfo = results[0]
    const token = jwt.sign({
      name: userInfo.username,
      id: userInfo.userId,
      time: Date.now()
    }, config.tokenSecret, { expiresIn: '2h' });

    ctx.response.body = {
      success: 1,
      message: '',
      data: {
        userInfo: userInfo,
        token: token
      }
    };

  } catch (error) {
    console.log(error);
    ctx.response.body = {
      success: 0,
      message: '查询数据出错',
      posts: null
    };
  }
}

export {
  getCode,
  login
}