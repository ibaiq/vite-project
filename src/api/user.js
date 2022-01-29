import request from "@/utils/request.js";
import qs from "qs";
import exp from "constants";

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

/**
 * 获取用户信息列表
 */
export function userList(params) {
  return request("/manage/user/pagination", {
    method: "GET",
    params,
  });
}

/**
 * 修改用户状态
 */
export function modifyStatus(userId, status) {
  return request(`/manage/user/${userId}/${status}`, {
    method: "PUT",
  });
}

/**
 * 获取单个用户信息
 */
export function getUser(userId) {
  return request(`/manage/user/${userId}`, {
    method: "GET",
  });
}

/**
 * 修改用户信息
 */
export function modify(user) {
  return request("/manage/user", {
    method: "PUT",
    data: user,
  });
}
