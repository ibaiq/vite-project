import { createRouter, createWebHistory } from "vue-router";
import manage from "@/router/manage.js";
import store from "@/store/index.js";
import Nprogress from "nprogress";
import { Base64 } from "js-base64";
import { access, sentence } from "@/api/app.js";

Nprogress.configure({ showSpinner: false });

const routes = [
  {
    path: "/",
    name: "Index",
    hidden: true,
    component: () => import("@/views/Index.vue"),
    meta: { title: "首页" },
  },
  {
    path: "/login",
    name: "Login",
    hidden: true,
    component: () => import("@/views/Login.vue"),
    meta: { title: "请先登录" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const authList = [manage[0].path];

router.beforeEach((to, from, next) => {
  Nprogress.start();
  let suffix = "Ibaiq社区";
  if (to.path.includes(manage[0].path)) {
    suffix = "Ibaiq管理系统";
  }
  if (to.meta.title) {
    suffix = to.meta.title + " - " + suffix;
  }
  document.title = suffix;

  if (authList.indexOf("/".concat(to.fullPath.split("/")[1])) !== -1) {
    if (store.getters.token) {
      if (!store.getters.user) {
        store.dispatch("user/Profile").catch(() => {
          next(to.fullPath);
        });
      }
      if (to.matched.length === 0) {
        store
          .dispatch("menu/GetRoutes")
          .then(() => {
            router.addRoute({
              path: "/:pathMatch(.*)*",
              name: "NotFound",
              hidden: true,
              component: () => import("@/views/error/NotFound"),
              meta: { title: "页面不存在" },
            });
            sentence().then((res) => {
              store.commit("app/SET_SENTENCE", res.data);
            });
            next({ ...to, replace: true });
          })
          .catch((err) => {
            if (err.code === 401) {
              next(to.fullPath);
            } else {
              next("/");
            }
          });
      } else {
        next();
      }
    } else {
      next({ path: "/login", query: { redirect: to.fullPath } });
    }
  } else {
    if (to.matched.length === 0) {
      router.addRoute({
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        hidden: true,
        component: () => import("@/views/error/NotFound"),
        meta: { title: "页面不存在" },
      });
      next({ ...to, replace: true });
    } else {
      next();
    }
  }
});

router.afterEach((to) => {
  Nprogress.done();
  let data = {
    url: location.href.replace(/\/$/, ""),
    user: store.getters.user,
    token: store.getters.token,
  };
  let message = Base64.encode(JSON.stringify(data));
  access(message).then();
});

export default router;
