import request from '../utils/axios/request.js'

export const login = (data)=>{
  return request({
    method: 'POST',
    url: '/api/login',
    data
  })
}