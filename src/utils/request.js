import axios from "axios";
import store from "@/store/index.js";
import { ElMessage } from "element-plus";
import { remove } from "@/utils/auth-cookie.js";
import router from "@/router/index.js";
import asyncManage from "@/router/manage.js";

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 10000,
});

service.interceptors.request.use((config) => {
  if (store.getters.token) {
    config.headers["Authorization"] = "Bearer" + store.getters.token;
  }
  return config;
});

service.interceptors.response.use(
  (success) => {
    return success.data;
  },
  (error) => {
    let { message } = error;
    if (message.includes("timeout")) {
      error.response.data.msg = "接口请求连接超时";
      ElMessage.warning("接口请求连接超时");
    } else if (message === "Network Error") {
      error.response.data.msg = "后端接口连接异常";
      ElMessage.error("后端接口连接异常");
    }
    if (error.response.status === 401) {
      remove();
      store.commit("user/SET_TOKEN", undefined);
      store.commit("user/SET_USER", undefined);
      if (router.currentRoute.value.path.includes(asyncManage[0].path)) {
        router
          .replace({
            path: "/login",
            query: { redirect: router.currentRoute.value.fullPath },
          })
          .then()
          .catch();
      }
      ElMessage.error(error.response.data.msg);
    } else if (
      error.response.status === 500 ||
      error.response.status === 400 ||
      error.response.status === 404
    ) {
      ElMessage.error(error.response.data.msg || "服务器开小差了~");
    } else if (error.response.status === 403) {
      ElMessage.warning(error.response.data.msg);
    } else if (error.response.status === 405) {
      ElMessage.warning(error.response.data.msg);
    }
    return Promise.reject(error.response.data);
  }
);

export default service;
