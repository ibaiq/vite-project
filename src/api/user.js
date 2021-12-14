import request from "@/utils/request.js";
import qs from "qs";

/**
 * 获取个人信息
 */
export function profile() {
  return request("/user/profile", {
    method: "GET",
  });
}

/**
 * 登录
 */
export function login(user) {
  return request("/login", {
    method: "POST",
    data: qs.stringify(user),
  });
}

/**
 * 注销登录
 */
export function logout() {
  return request("/logout", {
    method: "POST",
  });
}
