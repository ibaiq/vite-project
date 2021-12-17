import { getToken, remove } from "@/utils/auth-cookie.js";
import { logout, profile } from "@/api/user.js";
import { ElMessage } from "element-plus";

const state = {
  token: getToken(),
  user: {},
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_USER: (state, user) => {
    state.user = user;
  },
};

const actions = {
  Profile: ({ commit }) => {
    return new Promise((resolve, reject) => {
      profile()
        .then((res) => {
          let reg =
            /^(http:\/\/|https:\/\/|\/\/)?(([A-Za-z0-9]+-[A-Za-z0-9]+|[A-Za-z0-9]+)\.)+([A-Za-z]+)[/?:]?.*$/;
          res.data.avatar = reg.test(res.data.avatar)
            ? res.data.avatar
            : import.meta.env.VITE_APP_BASE_API + res.data.avatar;
          commit("SET_USER", res.data);
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  Logout: ({ commit }) => {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          commit("SET_TOKEN", undefined);
          commit("SET_USER", {});
          resolve();
        })
        .catch(() => {
          commit("SET_TOKEN", undefined);
          commit("SET_USER", {});
          reject();
        });
      remove();
      ElMessage.success("注销成功");
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
