import axios from 'axios'
import store from '@/store'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})

request.interceptors.request.use(function (config) {
  const { user } = store.state
  if (user) {
    // 方法一：直接赋值
    config.headers.Authorizations = `Bearer ${user.token}`
    // 方法二：将headers作为对象添加Authorizations属性
    // config.headers = { Authorizations: `Bearer ${user.token}` }
  }
  return config
}, function (err) {
  return Promise.reject(err)
})

request.interceptors.response.use(function (response) {
  return response
}, function (err) {
  return Promise.reject(err)
})

export default request
