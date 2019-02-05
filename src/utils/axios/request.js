import React from "react"
import ReactDOM from "react-dom"
import axios from 'axios'
import {mountNode} from '../someutils.js'
import { Alert } from 'antd';

let requset = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 5000
});

// 添加请求拦截器
requset.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if(token){
            config.headers.common['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    });


// 添加响应拦截器
requset.interceptors.response.use(
    (response) => {
        let res = response.data
        if (response.status === 200) {
            return res;
        } else {
            ReactDOM.render(<Alert message="Success Tips" type="success" showIcon />,mountNode)
        }
    },
    (error) => {
        // Message({
        //     message: error.message,
        //     type: 'error',
        //     duration: 5 * 1000
        // })
        return Promise.reject(error);
    });

export default requset