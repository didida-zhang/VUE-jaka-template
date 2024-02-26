/*
 * @File name:
 * @Author: LSZ
 * @Version: V1.0
 * @Date: 2023-08-24 13:55:12
 * @Description:
 */
import axios from "axios";
import { message } from "ant-design-vue";
import { useRobotStore } from "./store";
import { errormsg } from "./error";
import i18n from "@/i18n/index";
const { t } = i18n.global;
let showMessage = true;
const customMessage = (msg: string) => {
  if (msg.includes("two many inputs bind to the same function")) {
    return "该功能已绑定其他IO端口";
  }
  return msg;
};
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API || "/api", // 所有的请求地址前缀部分 await getBaseUrl()
  timeout: 60000, // 请求超时时间毫秒
  withCredentials: true, // 异步请求携带cookie
  headers: {
    robotIp: "127.0.0.1",
  },
});
service.interceptors.request.use(
  function (config: any) {
    return config;
  },

  function (error: any) {
    return Promise.reject(error);
  }
);
// 添加响应拦截器

service.interceptors.response.use(
  function (response: { data: any; config: any }) {
    const dataAxios = response.data;
    if (dataAxios.errcode != 0||dataAxios.code == 0) {
      if (!(response.config as any).hideError) {
        const msg = errormsg as any;
        if (
          msg[`error-${dataAxios["errcode"]}`] &&
          msg[`error-${dataAxios.errcode}`][
            localStorage.getItem("locale") || ""
          ]
        ) {
          message.error(
            `${
              msg[`error-${dataAxios.errcode}`][
                localStorage.getItem("locale") || ""
              ]
            }`
          );
        } else {
          if (dataAxios["errormsg"]) {
            message.error(customMessage(`${dataAxios["errormsg"]}`));
          } else {
            message.error(t("SERVER_CONNECTION_FAILED"));
          }
        }
      }
      return Promise.reject(dataAxios.errormsg);
    }

    return dataAxios;
  },

  function (error: any) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (showMessage) {
      message.error(t("SERVER_CONNECTION_FAILED"));
      showMessage = false;
      setTimeout(() => {
        showMessage = true;
      }, 1000);
    }

    return Promise.reject(error);
  }
);
const grpcRequest = (reqtype: any, data: any, other?: any) => {
  const robot = useRobotStore();
  return service({
    url: "/grpcRequest/",
    method: "post",
    data: {
      reqtype,
      ...data,
    },
    headers: {
      robotIp: robot.info.robotIp,
    },
    ...other,
  });
};

export { grpcRequest };
export default service;
