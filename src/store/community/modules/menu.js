import ManageLayout from "@/layout/ManageLayout.vue";
import ParentView from "@/components/parentView/Index.vue";
import InnerLink from "@/components/innerLink/Index.vue";
import { getRoutes } from "@/api/menu.js";
import manage from "@/router/manage.js";
import router from "@/router/index.js";

// const path = require("path");

const state = {
  menus: [],
  routes: [],
  topNavRoutes: [],
};

const mutations = {
  SET_MENUS: (state, menus) => {
    state.menus = menus;
  },
  SET_ROUTES: (state, routes) => {
    state.routes = routes;
  },
  SET_TOP_NAV_ROUTES: (state, topNavRoutes) => {
    state.topNavRoutes = topNavRoutes;
  },
};

const actions = {
  GetRoutes: ({ commit }) => {
    return new Promise((resolve, reject) => {
      getRoutes()
        .then((res) => {
          console.log(res);
          const routes = JSON.parse(JSON.stringify(res.data));
          const sidebarRoutes = filterAsyncRouter(routes);
          const backRoute = JSON.parse(JSON.stringify(res.data));
          const backupRoutes = filterAsyncRouter(backRoute);

          backupRoutes.forEach((route) => {
            route.path = route.path.replace("/", "");
          });
          backupRoutes.forEach((route) => {
            manage[0].children.push(route);
            // route.path = path.resolve(manage[0].path, route.path);
          });
          sidebarRoutes.forEach((sidebar) => {
            sidebar.path.replace("/", "");
          });

          commit("SET_MENUS", sidebarRoutes);
          commit("SET_ROUTES", manage);
          commit("SET_TOP_NAV_ROUTES", backupRoutes);

          manage.forEach((route) => {
            router.addRoute(route);
          });
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

const filterAsyncRouter = (asyncRouterMap, lastRoute = false, type = false) => {
  return asyncRouterMap.filter((route) => {
    if (type && route.children) {
      route.children = filterChildren(route.children);
    }
    if (route.component) {
      // Layout ParentView 组件特殊处理
      if (route.component === "ManageLayout") {
        route.component = ManageLayout;
      } else if (route.component === "ParentView") {
        route.component = ParentView;
      } else if (route.component === "InnerLink") {
        route.component = InnerLink;
      } else {
        route.component = loadView(route.component);
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, route, type);
    } else {
      delete route["children"];
      delete route["redirect"];
    }
    return true;
  });
};

const filterChildren = (childrenMap, lastRoute = false) => {
  let children = [];
  childrenMap.forEach((el) => {
    if (el.children && el.children.length) {
      if (el.component === "ParentView") {
        el.children.forEach((child) => {
          child.path = el.path + "/" + child.path;
          if (child.children && child.children.length) {
            children = children.concat(filterChildren(child.children, child));
            return;
          }
          children.push(child);
        });
        return;
      }
    }
    if (lastRoute) {
      el.path = lastRoute.path + "/" + el.path;
    }
    children = children.concat(el);
  });
  return children;
};

const modules = import.meta.glob("../../views/**/**.vue");

export const loadView = (view) => {
  let path = "../../views/";
  if (new RegExp("^/views/.*$").test(view)) {
    path += view.replace(/^\/views\//, "");
  } else if (new RegExp("^views/.*$").test(view)) {
    path += view.replace(/^views\//, "");
  } else if (new RegExp("^@/views/.*$").test(view)) {
    path += view.replace(/^@\/views\//, "");
  } else {
    path += view;
  }
  if (!path.includes(".vue")) {
    path += ".vue";
  }
  return modules[path];
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
