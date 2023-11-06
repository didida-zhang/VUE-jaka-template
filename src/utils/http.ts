/*
 * @File name:
 * @Author: LSZ
 * @Version: V1.0
 * @Date: 2023-08-24 13:55:12
 * @Description:
 */
import axios from 'axios'
import { message } from 'ant-design-vue'
import { errormsg } from './error'

let showMessage = true
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API, // 所有的请求地址前缀部分
  timeout: 60000, // 请求超时时间毫秒
  withCredentials: true, // 异步请求携带cookie
  headers: {
    robotIp: '127.0.0.1'
  }
})
service.interceptors.request.use(
  function (config: any) {
    return config
  },

  function (error: any) {
    return Promise.reject(error)
  }
)

// 添加响应拦截器

service.interceptors.response.use(
  function (response: { data: any; config: any }) {
    const dataAxios = response.data
    if (dataAxios.errcode != 0 || dataAxios.code != 0 || dataAxios.errstring) {
      if (!(response.config as any).hideError) {
        const code: any = `error-${dataAxios.errcode}`
        if ((errormsg as any)[code] && (errormsg as any)[code]['zh_CN']) {
          message.error(`${(errormsg as any)[code]['zh_CN']}`)
        } else {
          message.error(`服务器连接失败`)
        }
      }
    }

    return dataAxios
  },

  function (error: any) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (showMessage) {
      message.error('服务器连接失败')
      showMessage = false
      setTimeout(() => {
        showMessage = true
      }, 1000)
    }

    return Promise.reject(error)
  }
)
const grpcRequest = (reqtype: any, data: any, other?: any) => {
  return service({
    url: '/grpcRequest/',
    method: 'post',
    data: {
      reqtype,
      ...data
    },
    ...other
  })
}

export { grpcRequest }
export default service
