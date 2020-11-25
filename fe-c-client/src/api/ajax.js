/*
能发送ajax请求的函数模块
用来连接前后端数据
函数的返回值，是promise对象
*/

// 引入axios
import axios from 'axios'
import {message} from 'antd'

// 这里向外抛出的是一个ajax函数
// ajax有3个参数，url, 请求数据data,请求类型type(默认是'GET)
export default function ajax(url, data={}, type='GET') {
    // 用promise统一处理错误请求提示
    return new Promise((resolve, reject) => {
        let promise
        if (type === 'GET') { // 发送GET请求
            promise = axios.get(url, { // 配置对象
                params: data
            })
        } else { // 发送POST请求
            promise =  axios.post(url, data)
        }
        promise.then(res => {
            resolve(res)
        })
        .catch(err => {
            // reject(err)
            message.error('请求出错了：', err.msg)
        })
    })  
}
