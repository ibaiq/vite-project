const getters = {
  token: (state) => state.user.token,
  user: (state) => state.user.user,
  menus: (state) => state.menu.menus,
  routes: (state) => state.menu.routes,
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  topNav: (state) => state.menu.topNavRoutes,
  sentence: (state) => state.app.sentence,
};

export default getters;
