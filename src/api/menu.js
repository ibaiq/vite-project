import request from "@/utils/request.js";

/**
 * 获取路由信息
 */
export function getRoutes() {
  return request("/manage/menu/getRouters", {
    method: "GET",
  });
}
