import axios from 'axios'
import JSONbig from 'json-bigint'
import store from '@/store'
import router from '@/router'
// 创建一个axios实例 设置不同的baseURL
const instance = axios.create({
  timeout: 5000,
  baseURL: 'http://ttapi.research.itcast.cn'
})

instance.defaults.transformResponse = [function (data) {
  try {
    // data 数据可能不是标准的 JSON 格式字符串，否则会导致 JSONbig.parse(data) 转换失败报错
    return JSONbig.parse(data)
  } catch (err) {
    // 无法转换的数据直接原样返回
    return data
  }
}]

// 请求拦截
instance.interceptors.request.use(function (config) {
  if (store.state.user) {
    // 如果有登录状态请求的时候，自动携带token
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截
instance.interceptors.response.use(function (response) {
  return response.data.data || response.data
}, async function (error) {
  // 判断状态码是否是401
  // console.dir(error)
  if (error.response.status === 401) {
    // 如果是401，使用refresh_token交换新的token
    const refreshToken = store.state.user.refresh_token

    try {
      const response = await axios({
        method: 'put',
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      })
      // 新的2小时可用的token
      const token = response.data.data.token
      // 存储新的token
      store.commit('setUser', {
        token: token,
        refresh_token: refreshToken
      })
      // 重新发送上一次401的请求
      return instance(error.config)
    } catch (err) {
      console.log(err)
      // console.log(router)
      // 跳转到首页
      // 如果refresh_token过期，跳转到登录页面
      router.push({
        path: '/login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    }
  }
  return Promise.reject(error)
})

export default instance
