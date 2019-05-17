import axios from 'axios';
import qs from 'qs';
import { Message, MessageBox } from 'element-ui';
import store from '../store';
import { getToken } from '@/utils/auth';

// 创建axios实例
const service = axios.create({
  baseURL: '/idcard', /* 跨域里面配置了 */
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    config.data = qs.stringify(config.data);
    if (store.getters.token) {
      config.headers['X-Token'] = getToken() /* 让每个请求携带自定义token */
      config.headers['Authorization'] = 'APPCODE 6b9b031e9b3b4df3b545ee080458c8f0';
    }
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

// response 拦截器 [暂时对非 20000 只做了统一处理，之后可细化]
service.interceptors.response.use(
  response => {
    /* 取返回数据 */
    const res = response.data

    alert("测试返回"+res.ret);
    alert("haha"+res.ret+res.msg);
    /* 返回 code 为非 20000 */
    if (res.code !== 20000 && res.ret != 200) {
      /* 弹出错误信息 */
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service