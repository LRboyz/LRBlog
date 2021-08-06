import CONFIG from "@/config"
import { message, notification } from "antd"
import { extend, ResponseError } from "umi-request"

const codeMessage: { [status: number]: string } = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。",
}

/***************************/
/******* 请求异常处理 *******/
/***************************/

const errorHandler = async (error: ResponseError) => {
  console.log(error, "error....")
  const { response, data } = error
  const { code, msg } = data
  if (response?.status) {
    const errorText = codeMessage[response.status] || response.statusText
    const { status, url } = response
    notification.error({
      message: `${errorText},Status: ${status}, URL: ${url}`,
    })
  }
  if (data?.code.toString().charAt(0) !== "2") {
    notification.error({
      message: `${msg}, Code: ${code}`,
    })
  }
  if (!response?.status && data?.code.toString().charAt(0) !== "2") {
    notification.error({
      message: "您的网络发生异常，无法连接服务器",
    })
  }
  throw error
}

/** 配置request请求时的默认参数 */
const request = extend({
  prefix: CONFIG.http.baseURL,
  errorHandler, // 默认错误处理
})

/***************************/
/****** 请求拦截器处理 ******/
/***************************/

// request.interceptors.request.use((url, options) => {
//   let token = Cookies.get("access_token")
//   const headers = {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//     Authorization: token,
//   }
//   return {
//     url,
//     options: {
//       ...options,
//       headers,
//     },
//   }
// })
/***************************/
/****** 响应截器处理 ******/
/***************************/
// request.interceptors.response.use(async (response) => {
//   const codeMaps = {
//     401: "用户登录状态失效",
//     403: "用户令牌无效",
//   }
//   const result = await response.clone().json()
//   if (result.code.toString().charAt(0) === "4") {
//     Notification.warning(codeMaps[result.code])
//     Cookies.remove("access_token")
//     Store.dispatch({
//       type: "RESET_STATE",
//       path: "userInfo",
//     })
//     Router.push("/login")
//   }
//   // Notification.error(codeMaps[response.status])
//   return response
// })

export default request
