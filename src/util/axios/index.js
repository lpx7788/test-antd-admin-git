/**
 * 全站http配置
 *
 * axios参数说明
 */
import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { notification } from "ant-design-vue";
// import store from "@/store/";

// 基础路径
axios.defaults.baseURL = '/api'
// 默认超时时间
axios.defaults.timeout = 20000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// 返回其他状态码
axios.defaults.validateStatus = function(status) {
  return status >= 200 && status <= 500;
};
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true;

// http request拦截
axios.interceptors.request.use(
  config => {
    config.headers['zkbgsystem'] = ''
    const configData = config;
    // 开启 progress
    NProgress.start();
    return configData;
  },
  error => {
    return Promise.reject(error);
  }
);
// http response 拦截
axios.interceptors.response.use(
  res => {
    let resData = res;
    // 关闭 progress
    NProgress.done();
    // 获取状态码
    const status = resData.data.code || resData.status;
    const errCode = resData.data.errorCode;
    const msg = resData.data.errorMsg;
    // 如果请求为非200否者默认统一处理
    if (status !== 200) {
      if (errCode === 2000) {
        notification.error({
          message: "Notification Title",
          description: "未登录."
        });
      } else {
        notification.error({
          message: "Notification Title",
          description: msg
        });
      }
      return Promise.reject(new Error(msg));
    }
    return resData.data;
  },
  error => {
    NProgress.done();
    return Promise.reject(new Error(error));
  }
);

export default axios;
