import request from "@/utils/request.js";

/**
 * 向后端写入用户访问那些前端页面以及数据
 * 存储访问日志
 */
export async function access(data) {
  request("/access", {
    method: "POST",
    headers: {
      Access: data,
    },
  });
}

/**
 * 每日一句
 */
export async function sentence() {
  return request("/sentence", {
    method: "GET",
  });
}
